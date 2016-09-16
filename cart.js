var ShoppingCart = {total: 0, items: []};

ShoppingCart.new = function(pricingRules){
	this.total = 0;
	this.items = [];
	this.pricing = pricingRules;
	this.counts = {};
	this.promo = false;
	return this;
}

ShoppingCart.add = function(item, promoCode){
	this.items.push(item);
	
	if(promoCode != undefined && promoCode == 'I<3AMAYSIM'){
		this.promo = true;
	}
	
	this.total = 0;
	this.counts = {};
	for(var propt in this.pricing){
    this.counts[propt] = 0;
	}
	for(var i=0; i<this.items.length; i++){
		this.counts[this.items[i].code]++;
	}
	
	//special offer for small
	this.total = parseFloat(this.total) + ((this.counts['ult_small'] - parseInt(this.counts['ult_small'] / 3)) * this.pricing['ult_small']);
	
	//special offer for medium
	this.total = parseFloat(this.total) + (this.counts['ult_medium'] * this.pricing['ult_medium']);
	for(var i = this.counts['1gb']; i < this.counts['ult_medium']; i++){
		this.add(products[3]);
	}
	
	//special offer for large
	if(this.counts['ult_large'] > 3){
		this.total = parseFloat(this.total) + (this.counts['ult_large'] * 39.9);
	}
	else{
		this.total = parseFloat(this.total) + (this.counts['ult_large'] * this.pricing['ult_large']);
	}
	
	//For 1GB
	this.total = parseFloat(this.total) + ((this.counts['1gb'] - this.counts['ult_medium']) * this.pricing['1gb']);
	
	if(this.promo){
		this.total = (this.total - (this.total * 0.1));
	}
	
	this.total = this.total.toFixed(2);
}
ShoppingCart.showCart = function(){
	console.log("Total Cost: $" + cart.total);
	console.log("Cart Contents:");
	for(var propt in cart.pricing){
		if(cart.counts[propt] > 0){
			for(var i=0; i < products.length; i++){
				if(propt == products[i].code){
					break;
				}
			}
    	console.log(cart.counts[propt] + " x " + products[i].name);
    }
	}
}