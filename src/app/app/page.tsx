import WelcomePage from "~/components/WelcomePage";

type ScreenType = "welcome" | "language" | "login";

export default function OnboardingPage({
  searchParams,
}: {
  searchParams: {
    screen?: ScreenType;
  };
}) {
  const currentPage = searchParams.screen ?? "welcome";

  return (
    <div className="container mx-auto min-h-screen">
      <WelcomePage currentPage={currentPage} />;
    </div>
  );
}
