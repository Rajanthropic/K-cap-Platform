import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ShopPage() {
  const userCredits = 1200;

  const items = [
    {
      id: "s1",
      name: "Amazon Gift Card - ₹500",
      brand: "Amazon",
      category: "Gift Card",
      cost: 500,
      stock: 50,
      image: "https://placehold.co/400x250/FF9900/FFFFFF?text=Amazon+Gift+Card"
    },
    {
      id: "s2",
      name: "CRIO Exclusive Hoodie",
      brand: "CRIO",
      category: "Merch",
      cost: 1500,
      stock: 15,
      image: "https://placehold.co/400x250/111827/FFFFFF?text=CRIO+Hoodie"
    },
    {
      id: "s3",
      name: "Valorant Points (1000 VP)",
      brand: "Riot Games",
      category: "Gaming",
      cost: 1000,
      stock: 30,
      image: "https://placehold.co/400x250/FA4454/FFFFFF?text=Valorant+Points"
    },
    {
      id: "s4",
      name: "Spotify Premium - 3 Months",
      brand: "Spotify",
      category: "Voucher",
      cost: 800,
      stock: 0,
      image: "https://placehold.co/400x250/1DB954/FFFFFF?text=Spotify+Premium"
    }
  ];

  return (
    <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
          <p className="text-muted-foreground">Redeem your hard-earned Kreds for rewards.</p>
        </div>
        <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-lg border border-primary/20">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <div className="text-sm font-medium">Your Balance:</div>
          <div className="text-xl font-bold text-primary">{userCredits} Kreds</div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <Badge variant="default" className="cursor-pointer whitespace-nowrap">All Items</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted whitespace-nowrap">Gift Cards</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted whitespace-nowrap">CRIO Merch</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted whitespace-nowrap">Gaming</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted whitespace-nowrap">Vouchers</Badge>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(item => {
          const canAfford = userCredits >= item.cost;
          const isOutOfStock = item.stock === 0;

          return (
            <Card key={item.id} className={`flex flex-col overflow-hidden ${isOutOfStock ? 'opacity-70' : ''}`}>
              <div className="aspect-[16/10] bg-muted relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <Badge className="absolute top-2 right-2 bg-background/90 text-foreground backdrop-blur-sm hover:bg-background/90">
                  {item.category}
                </Badge>
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="text-xs text-muted-foreground font-medium mb-1">{item.brand}</div>
                <CardTitle className="text-lg line-clamp-1">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-1">
                <div className="flex items-center justify-between mt-2">
                  <div className={`text-xl font-bold ${canAfford && !isOutOfStock ? 'text-primary' : 'text-muted-foreground'}`}>
                    {item.cost} Kreds
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isOutOfStock ? 'Out of stock' : `${item.stock} left`}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Dialog>
                  <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      {isOutOfStock ? 'Sold Out' : !canAfford ? 'Not enough Kreds' : 'Redeem Now'}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Redemption</DialogTitle>
                      <DialogDescription>
                        You are about to redeem {item.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-muted-foreground">Current Balance</span>
                        <span className="font-medium">{userCredits} Kreds</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-muted-foreground">Cost</span>
                        <span className="font-medium text-red-500">-{item.cost} Kreds</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">Remaining Balance</span>
                        <span className="font-bold text-primary">{userCredits - item.cost} Kreds</span>
                      </div>
                      
                      {item.category === 'Merch' && (
                        <div className="bg-muted p-3 rounded-lg mt-4 space-y-2 text-sm">
                          <p className="font-medium">Shipping Information Required</p>
                          <p className="text-muted-foreground">This item requires physical shipping. It will be sent to the default address on your profile.</p>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Confirm Order</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
