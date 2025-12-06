'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

const getWeatherCondition = (code: number, isDay: boolean): { condition: string; icon: string } => {
  // Clear sky
  if (code === 0) {
    return { condition: 'Clear', icon: isDay ? '☀️' : '🌙' };
  }
  // Partly cloudy
  if (code <= 3) {
    return { condition: 'Partly Cloudy', icon: isDay ? '⛅' : '☁️' };
  }
  // Fog
  if (code <= 48) {
    return { condition: 'Foggy', icon: '🌫️' };
  }
  // Drizzle/Rain
  if (code <= 67) {
    return { condition: 'Rainy', icon: '🌧️' };
  }
  // Snow
  if (code <= 77) {
    return { condition: 'Snowy', icon: '❄️' };
  }
  // Rain showers
  if (code <= 82) {
    return { condition: 'Rainy', icon: '🌦️' };
  }
  // Snow showers
  if (code <= 86) {
    return { condition: 'Snowy', icon: '🌨️' };
  }
  // Thunderstorm
  if (code <= 99) {
    return { condition: 'Stormy', icon: '⛈️' };
  }
  return { condition: 'Clear', icon: isDay ? '☀️' : '🌙' };
};

const legalLinks = [
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutzerklaerung', label: 'Datenschutz\u00ADerklärung' },
];

const pageLinks = [
  { href: '/about', label: 'About' },
  { href: '/now', label: 'Now' },
  { href: '/manifesto', label: 'Manifesto' },
];

export default function Footer() {
  const [hamburgTime, setHamburgTime] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Europe/Berlin',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      setHamburgTime(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Hamburg Altona coordinates: 53.5511, 9.9937
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=53.5511&longitude=9.9937&current=temperature_2m,weather_code,is_day&timezone=Europe/Berlin'
        );
        const data = await response.json();

        const weatherInfo = getWeatherCondition(
          data.current.weather_code,
          data.current.is_day === 1
        );

        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          condition: weatherInfo.condition,
          icon: weatherInfo.icon,
        });
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };

    fetchWeather();
    // Update weather every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full pt-6 pb-[24px]" style={{ background: 'linear-gradient(to top, rgba(138, 221, 144, 0.3), rgba(138, 221, 144, 0))' }}>
      <div className="px-8">
        <div className="flex justify-between max-mobile:flex-col-reverse max-mobile:gap-8">
          <div style={{ display: 'flex', gap: '80px' }}>
            {/* Legal Links Column */}
            <div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {legalLinks.map((link) => (
                  <li key={link.href} style={{ lineHeight: '100%' }}>
                    <Link href={link.href} className="link-mono">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Page Links Column */}
            {/* <div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {pageLinks.map((link) => (
                  <li key={link.href} style={{ lineHeight: '100%' }}>
                    <Link href={link.href} className="link-mono">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
          <div style={{ maxWidth: '360px' }}>
            <p className="typography-body-sm" style={{ margin: 0 }}>
              The Products Papers is product design publication by <a href="https://www.orbitlabs.de" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Orbit Labs</a>. The project is maintained by Suryanshu Rai. Some other text explaining thing. Lorum ipsum filler fuller textie mextie maxie poodle.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8 gap-20 border-t border-[#e0e0e0] pt-4 max-mobile:flex-col max-mobile:gap-4">
          {/* Part 1: Crafted text */}
          <div className="font-mono" style={{ fontSize: '14px' }}>
            <span style={{ fontSize: '20px', lineHeight: '20px', display: 'inline-flex', alignItems: 'center' }}>👨🏼‍🎨</span>
            <span> Hand crafted and </span>
            <span style={{ fontSize: '20px', lineHeight: '20px', display: 'inline-flex', alignItems: 'center' }}>🤖</span>
            <span> vibe coded in Altona</span>
          </div>

          {/* Part 2: Time & Weather */}
          <div className="font-mono text-[14px] flex items-center gap-3 max-mobile:gap-2 max-mobile:flex-wrap max-mobile:justify-center">
            <span>{hamburgTime.split(':').map((part, i) => (
              <span key={i}>
                {part}
                {i < hamburgTime.split(':').length - 1 && (
                  <span style={{
                    animation: 'blink 1s step-start infinite'
                  }}>:</span>
                )}
              </span>
            ))}</span>
            {weather && (
              <>
                <span>·</span>
                <span>{weather.temperature}°C · {weather.condition}</span>
                <span style={{ fontSize: '24px', lineHeight: '24px', display: 'inline-flex', alignItems: 'center' }}>{weather.icon}</span>
              </>
            )}
          </div>
          <style jsx>{`
            @keyframes blink {
              50% {
                opacity: 0;
              }
            }
          `}</style>
        </div>
      </div>
    </footer>
  );
}
