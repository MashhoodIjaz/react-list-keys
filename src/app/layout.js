import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "List Keys Behavior in React",
  description: "Observe the list keys behavior in React visually",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={
          inter.className + " text-lg lg:text-xl text-white bg-slate-900"
        }
      >
        {children}
        <footer className="text-lg flex flex-col items-center justify-center p-4">
          <p>You can check out the source code at</p>
          <a
            href="https://github.com/mashhoodijaz/react-list-keys"
            className="text-blue-600 break-words text-center"
            target="_blank"
          >
            https://github.com/mashhoodijaz/react-list-keys
          </a>
        </footer>
      </body>
    </html>
  );
}
