import { createFileRoute, Outlet } from "@tanstack/react-router";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import EnquiryDrawer from "@/components/enquiry/EnquiryDrawer";
import SocialProofToast from "@/components/SocialProofToast";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0F12]">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <EnquiryDrawer />
      <SocialProofToast />
    </div>
  );
}