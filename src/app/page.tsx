"use client"; // This is a client component

import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const meals = [
  { id: 1, name: 'Pizza', price: 10 },
  { id: 2, name: 'Burger', price: 8 },
  { id: 3, name: 'Fries', price: 4 },
];

const SmartMeals = () => {
  const [cart, setCart]: any[] = useState([]);

  const addToCart = (meal: any) => {
    const existingItem = cart.find((item: any) => item.id === meal.id);
    if (existingItem) {
      setCart(cart.map((item: any) =>
        item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...meal, quantity: 1 }]);
    }
  };

  const removeFromCart = (mealId: number) => {
    setCart(cart.filter((item: any) => item.id !== mealId));
  };

  const updateQuantity = (mealId: number, change: number) => {
    setCart(cart.map((item: any) => {
      if (item.id === mealId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const totalPrice = cart.reduce((sum: number, item: { price: number; quantity: number; }) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-600">SmartMeals</h1>
        <h1 className="text-xl font-bold text-center mb-8">Welcome, Stacy!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-green-500 text-white font-bold text-xl">Menu</CardHeader>
            <CardContent>
              {meals.map(meal => (
                <div key={meal.id} className="flex justify-between items-center mt-4">
                  <span>{meal.name} - ${meal.price}</span>
                  <Button onClick={() => addToCart(meal)} className="bg-blue-500 hover:bg-blue-600">
                    <Plus size={16} className="mr-2" /> Add to Cart
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-orange-500 text-white font-bold text-xl">
              <div className="flex justify-between items-center">
                <span>Cart</span>
                <ShoppingCart size={24} />
              </div>
            </CardHeader>
            <CardContent>
              {cart.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center mt-4">
                  <span>{item.name} (${item.price} x {item.quantity})</span>
                  <div className="flex items-center">
                    <Button onClick={() => updateQuantity(item.id, -1)} className="bg-yellow-500 hover:bg-yellow-600 mr-1">
                      <Minus size={16} />
                    </Button>
                    <Button onClick={() => updateQuantity(item.id, 1)} className="bg-green-500 hover:bg-green-600 mr-1">
                      <Plus size={16} />
                    </Button>
                    <Button onClick={() => removeFromCart(item.id)} className="bg-red-500 hover:bg-red-600">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-xl font-bold">Total: ${totalPrice.toFixed(2)}</div>
              <Button className="w-full mt-4 bg-purple-500 hover:bg-purple-600">Checkout</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SmartMeals;