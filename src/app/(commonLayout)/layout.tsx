import PublicNavbar from "@/components/modules/shared/PublicNavbar"

interface IProps {
      children: React.ReactNode
};

export default function CommonLayout({ children }: IProps) {
      return (
            <>
                  <PublicNavbar />
                  {children}
            </>
      )
}
