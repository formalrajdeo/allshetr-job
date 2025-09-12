import { Providers } from "../providers"; // adjust path as needed

export default function SlugLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            {children}
        </Providers>
    );
}
