import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getServerAuthSession } from "~/server/auth";
import * as Icons from "./_Icons";

const HomeTile = ({
  href,
  icon,
  title,
  isDisabled,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  isDisabled?: boolean;
}) => (
  <Link
    href={!isDisabled ? href : "#"}
    aria-disabled={isDisabled}
    className="bg-primary text-primary-foreground flex aspect-square w-full max-w-[150px] flex-col items-center justify-center space-y-3 rounded-lg aria-disabled:opacity-70"
  >
    {icon}
    <p className="text-center font-bold">{title}</p>
  </Link>
);

export default async function HomePage() {
  const session = await getServerAuthSession();
  if (!session) redirect("/app?screen=login");

  return (
    <div className="flex min-h-screen flex-col pt-8">
      <div className="container mx-auto flex-1">
        <div>
          <div className="grid grid-cols-[1fr,auto]">
            <h1 className="text-5xl font-bold">How can I help you?</h1>
            <Avatar className="h-12 w-12">
              <AvatarImage src={session.user.image ?? ""} />
              <AvatarFallback>{session.user.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          <h3 className="mt-4">
            An app that helps you with German Bureaucracy. For more social
            sustainability.
          </h3>
        </div>
        <div className="mt-12 grid flex-1 grid-cols-2 gap-x-12 gap-y-4">
          <HomeTile
            href="/app/residence-permit"
            icon={<Icons.PermitIcon />}
            title="Apply for residence permit"
          />
          <HomeTile
            href="/"
            icon={<Icons.SuitcaseIcon />}
            title="Apply for a work permit"
            isDisabled
          />
          <HomeTile
            href="/"
            icon={<Icons.MoneyIcon />}
            title="Find a job"
            isDisabled
          />
          <HomeTile
            href="/"
            icon={<Icons.HouseIcon />}
            title="Find a residence"
            isDisabled
          />
          <HomeTile
            href="/"
            icon={<Icons.BuddyIcon />}
            title="Find a buddy"
            isDisabled
          />
        </div>
      </div>
      <div className="bg-primary h-20 w-screen" />
    </div>
  );
}
