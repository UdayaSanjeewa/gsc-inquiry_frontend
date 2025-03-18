import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { InquiryProvider } from "../../context/InquiryContext";
import { ChannelProvider } from "../../context/channelContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Inquiry Management GSC",
  description: "Inquiry Management Application of Global Stanford Campus",
};

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <InquiryProvider>
            <ChannelProvider>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
              />
              <SidebarProvider>
                <AppSidebar />
                <main className="w-full pr-4 font-poppins">
                  <SidebarTrigger />
                  <div className="w-full pt-4">
                    <div className="-mt-8">{/* <Navbar /> */}</div>
                    {children}
                  </div>
                </main>
              </SidebarProvider>
            </ChannelProvider>
          </InquiryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
