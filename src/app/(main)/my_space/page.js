"use client";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/app/(api)/api";

import Link from "next/link";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchAPI("products", "GET", null, token).then(setProducts);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Products</h1>
        <Link href="/dashboard/new" className="bg-green-600 text-white px-4 py-2 rounded">Add Product</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h2 className="font-bold text-lg">{p.name}</h2>
            <p className="text-gray-600">{p.description}</p>
            <p className="font-semibold mt-2">₹{p.price}</p>
            <Link href={`/dashboard/${p.id}`} className="text-blue-600 mt-2 block">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
