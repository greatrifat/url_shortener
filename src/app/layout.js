
import "./globals.css";


export const metadata = {
  title: "Url Shortener by Greatrifat",
  description: "Url Shortener by Greatrifat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
