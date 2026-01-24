'use client';


export function Header() {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-rose-800">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
        </div>
        {/* <ProfileDropdown /> */}
      </div>
    </header>
  );
}