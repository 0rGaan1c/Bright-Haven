import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  return (
    <nav className="flex justify-between items-center p-5 font-semibold bg-background text-foreground">
      <p className="text-2xl">supertasks.io</p>
      <div className="flex items-center gap-8 text-lg">
        <ThemeToggle />
        <p>Workspaces</p>
        <p>About</p>
        <p>Pricing</p>
        <p>Feedback</p>
        <p>Login</p>
      </div>
    </nav>
  );
}
