import PublicFooter from "@/components/modules/shared/PublicFooter"
import PublicNavbar from "@/components/modules/shared/PublicNavbar"

interface IProps {
      children: React.ReactNode
};

export default function CommonLayout({ children }: IProps) {
      return (
            <div className="flex flex-col min-h-screen">
                  <PublicNavbar />
                  <main className="grow">
                        {children}
                  </main>
                  <PublicFooter />
            </div>
      )
}
