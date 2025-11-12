import { PortableTextComponents } from "@portabletext/react";

export const nowPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-6 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-4 space-y-1">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-4 space-y-1">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="pl-1">{children}</li>
    ),
    number: ({ children }) => (
      <li className="pl-1">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    underline: ({ children }) => (
      <span className="underline">{children}</span>
    ),
    link: ({ children, value }) => (
      <a 
        href={value?.href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="underline hover:opacity-70 transition duration-150"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?.url) return null;
      return (
        <div className="my-8 rounded-lg overflow-hidden">
          <img
            src={value.asset.url}
            alt={value.alt || ''}
            className="w-full h-auto"
            loading="lazy"
          />
          {value.alt && (
            <p className="text-sm text-gray-600 text-center mt-2 italic">
              {value.alt}
            </p>
          )}
        </div>
      );
    },
    video: ({ value }) => {
      if (!value?.asset?.url) return null;
      return (
        <div className="my-8 rounded-lg overflow-hidden">
          <video
            src={value.asset.url}
            controls
            className="w-full h-auto"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 text-center mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};
