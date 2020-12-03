const products = [
  { sku: "ipd", name: "Super iPad", price: 549.99 },
  { sku: "mbp", name: "MacBook Pro", price: 1399.99 },
  { sku: "atv", name: "Apple TV", price: 109.5 },
  { sku: "vga", name: "VGA adapter", price: 30.0 },
];

class Checkout {
  skus: string[] = [];
  orderTotal: number = 0.0;

  scan(sku: string) {
    this.skus.push(sku);
  }

  calculateTotal() {
    this.skus.map((sku: string) => {
      let item = products.find((product) => product.sku === sku);
      if (item) {
        this.orderTotal += item.price;
      }
    });
  }

  ipdDiscount() {
    this.skus.map((sku: string) => {
      let item = products.find((product) => product.sku === sku);
      if (item) {
        if (item.sku === "ipd") {
          this.orderTotal += item.price - 50;
        } else {
          this.orderTotal += item.price;
        }
      }
    });
  }

  countSkuOccurance(sku: string) {
    const count = this.skus.filter(function (value) {
      return value === sku;
    }).length;
    return count;
  }

  total(): number {
    // Bundle in a free VGA adapter free of charge with every MacBook Pro sold
    if (this.skus.indexOf("mbp") > -1 && this.skus.indexOf("vga") > -1) {
      this.skus.splice(this.skus.indexOf("vga"), 1);
      this.calculateTotal();
    } else {
      if (this.skus.indexOf("ipd") > -1) {
        const count = this.countSkuOccurance("ipd");
        //Check ipd count more than 4
        if (count > 4) {
          this.ipdDiscount();
        } else {
          this.calculateTotal();
        }
      } else if (this.skus.indexOf("atv") > -1) {
        const count = this.countSkuOccurance("atv");
        //check atv count more than 4
        if (count > 2) {
          this.skus.splice(this.skus.indexOf("atv"), 1);
          this.calculateTotal();
        } else {
          this.calculateTotal();
        }
      }
    }

    return this.orderTotal;
  }
}

const co = new Checkout();
co.scan("atv");
co.scan("atv");
co.scan("atv");
co.scan("vga");
console.log(`Total expected: $${co.total().toFixed(2)}`);
const co1 = new Checkout();
co1.scan("atv");
co1.scan("ipd");
co1.scan("ipd");
co1.scan("atv");
co1.scan("ipd");
co1.scan("ipd");
co1.scan("ipd");
console.log(`Total expected: $${co1.total().toFixed(2)}`);
const co2 = new Checkout();
co2.scan("mbp");
co2.scan("vga");
co2.scan("ipd");
console.log(`Total expected: $${co2.total().toFixed(2)}`);
