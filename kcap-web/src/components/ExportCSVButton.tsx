"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function ExportCSVButton() {
  const handleExport = () => {
    // Mock data based on the provided image format
    const data = [
      { Names: "Mann Panjabi", "Phone No.": "+91 9016661527", "Email ID": "panjabimann785@example.com", College: "Gyanmanjari Innovative University", City: "Bhavnagar", State: "Gujarat", "Mission Score": 85 },
      { Names: "Karan Bhanushali", "Phone No.": "6359826226", "Email ID": "karanbhanushali@example.com", College: "Shah N H commerce college valsad", City: "Valsad", State: "Gujarat", "Mission Score": 92 },
      { Names: "Shyam Bhanushali", "Phone No.": "9152800828", "Email ID": "Shyambhanusha@example.com", College: "Kes shroff college of arts and commerce", City: "Mumbai", State: "Maharashtra", "Mission Score": 78 },
      { Names: "Yash Kakkar", "Phone No.": "7852073478", "Email ID": "kakkary771@gmail.com", College: "University School of Automation and Technology", City: "Delhi", State: "Delhi", "Mission Score": 95 },
      { Names: "Sarthak Choudhary", "Phone No.": "9341664156", "Email ID": "sarthakchoudhary@example.com", College: "Sir M Visvesvaraya Institute of Technology", City: "Bengaluru", State: "Karnataka", "Mission Score": 88 },
      { Names: "Nishant Kumar", "Phone No.": "7303160818", "Email ID": "Vijayporwal09@example.com", College: "K.R. Managalam university , Gururgram", City: "Gurugram", State: "Haryana", "Mission Score": 70 },
      { Names: "Pratik Raj", "Phone No.": "8409817898", "Email ID": "prarik23raj@gmail.com", College: "VIT Chennai, Kelambakkam, Vandalur Road", City: "Chennai", State: "Tamil Nadu", "Mission Score": 81 },
      { Names: "Het Jasani", "Phone No.": "9327182403", "Email ID": "hetjasani2709@example.com", College: "Symbiosis Institute of Technology, Pune", City: "Pune", State: "Maharashtra", "Mission Score": 90 },
      { Names: "Ahmed Sahigara", "Phone No.": "8849148474", "Email ID": "inbox.ahmed.s@example.com", College: "Manipal Institute of Technology, Manipal", City: "Manipal", State: "Karnataka", "Mission Score": 87 },
      { Names: "Rohan Malyadri", "Phone No.": "9390058371", "Email ID": "beegalarohanma@example.com", College: "SRM University - AP, Andhra Pradesh", City: "Amaravati", State: "Andhra Pradesh", "Mission Score": 75 },
    ];

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((fieldName) => `"${row[fieldName as keyof typeof row]}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "kreons_export.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="outline" className="gap-2" onClick={handleExport}>
      <Download className="h-4 w-4" /> Export CSV
    </Button>
  );
}
