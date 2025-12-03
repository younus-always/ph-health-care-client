import RegisterForm from "@/components/modules/Register/RegisterForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
      return (
            <>
                  <div className="min-h-svh flex items-center justify-center p-6 md:p-10">
                        <div className="w-full max-w-xl">
                              <Card>
                                    <CardHeader>
                                          <CardTitle></CardTitle>
                                          <CardDescription></CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                          <RegisterForm />
                                    </CardContent>
                              </Card>
                        </div>
                  </div>
            </>
      )
}
