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

export default function Footer() {
  const [hamburgTime, setHamburgTime] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString('de-DE', {
        timeZone: 'Europe/Berlin',
        hour: '2-digit',
        minute: '2-digit',
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
    <footer style={{ borderTop: '1px solid#dcdcdc', paddingTop: '24px', paddingBottom: '24px' }}>
      <div className="container mx-auto px-8 max-w-4xl">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/impressum" className="link-mono">Impressum</Link>
              </li>
              <li>
                <Link href="/datenschutzerklaerung" className="link-mono">Datenschutzerklärung</Link>
              </li>
            </ul>
          </div>
          <div>
            <p>Lorem ipsum</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
          <div className="font-mono" style={{ fontSize: '14px' }}>
            <span>Hamburg Altona · {hamburgTime}</span>
          </div>
          <div className="font-mono" style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {weather && (
              <>
                <span style={{ fontSize: '32px', lineHeight: '32px', display: 'inline-flex', alignItems: 'center' }}>{weather.icon}</span>
                <span>{weather.temperature}°C · {weather.condition}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
