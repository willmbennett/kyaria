export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="w-screen min-h-screen">
            {children}
        </div>);
}