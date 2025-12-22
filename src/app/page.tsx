import EmailCopyLink from '@/components/EmailCopyLink';
import TextSection from '@/components/TextSection';
import { HeadingDefault, TextDefault, TextNarrow } from '@/components/TextLayout';

export default async function HomePage() {
  return (
    <>
      {/* Introduction Section */}
      <div className="pt-[120px] pb-20 flex flex-col gap-12">
        <HeadingDefault>
          <h1 className="typography-display">
            How are <br /> <span style={{ fontWeight: 900, fontStyle: 'italic' }}>really very good</span> <br /> things made?
          </h1>
        </HeadingDefault>
        <TextDefault className="typography-body-large">
          <p>
            The problem with attempting to make exceptional things is that they have to be exceptional in so many little ways.
          </p>
          <p>
            Here I explore if there can be a method to this or is it just pure chaos that can bring this about. Join me as I try to find some answers and try to make very really good things.
          </p>
        </TextDefault>
      </div>

      {/* Contact Section */}
      <div className="mb-20">
        <TextSection>
          <TextDefault className="typography-h3">
            Moin Moin!
          </TextDefault>
          <TextNarrow className="typography-body">
            <p>
              Are you trying to make something really very good and need a hand? Or you have some answers or questions to contribute? Either way I would love to hear from you. Drop me a line at <EmailCopyLink email="suryanshu.rai@orbitlabs.de" /> and I will get back to you!
            </p>
          </TextNarrow>
        </TextSection>
      </div>
    </>
  );
}