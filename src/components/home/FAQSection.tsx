
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Why Choose Refreshment Company?",
    answer: "Refreshment Company simplifies event planning with pre-ordered, FSSAI-compliant snacks and drinks for Chennai events (100+ attendees). Our platform offers tailored packages, real-time tracking, and 20-30% savings (₹50/unit vs. ₹65/unit), ensuring convenience and trust."
  },
  {
    question: "What is Refreshment Company?",
    answer: "We're a B2B service delivering bulk snacks and beverages (e.g., samosas, chai) for events, not full meals. With FSSAI compliance and tech-driven ordering, we're perfect for Chennai's corporate meetups and seminars."
  },
  {
    question: "How Can Refreshment Company Meet My Needs?",
    answer: "Order in 3 clicks: pick a package (e.g., \"Chennai Starter—₹50/unit\"), set delivery, and pay via UPI. Track live, ensure compliance, and save with our 50% off trial. Create a profile for repeat orders."
  },
  {
    question: "Is Refreshment Company FSSAI Compliant?",
    answer: "Yes, we use certified suppliers (e.g., Britannia), provide allergen labels, and track storage (<5°C) with IoT, avoiding ₹10 lakh fines and ensuring safety."
  },
  {
    question: "How Do I Get Started?",
    answer: "Visit our Pre-Order page, sign up, and place your first order with 50% off. Download our Planner Lite PDF for free event tips!"
  }
];

const FAQSection = () => {
  return (
    <section className="py-16 bg-brand-gray">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left text-brand-charcoal">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-brand-charcoal">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
