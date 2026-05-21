import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function OrderSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="p-10 max-w-md w-full text-center">
        <CardHeader className="p-0 mb-4">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl">Order Placed Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-muted-foreground mb-6">
            Thank you for your order. Your items will be delivered soon. Payment
            is due on delivery (COD).
          </p>
          <div className="flex flex-col gap-3">
            <Button className="w-full" onClick={() => navigate("/shop/account")}>
              View My Orders
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/shop/home")}
            >
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderSuccessPage;
