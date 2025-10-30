"use client";

import Button from "@/components/Button";
import designExample1Image from "@/assets/images/design-example-1.png";
import designExample2Image from "@/assets/images/design-example-2.png";
import Image from "next/image";
import Pointer from "@/components/Pointer";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import cursorYouImage from "@/assets/images/cursor-you.svg";
import emailjs from "@emailjs/browser";

export default function Hero() {
    const [leftDesignScope, leftDesignAnimate] = useAnimate();
    const [leftPointerScope, leftPointerAnimate] = useAnimate();
    const [rightDesignScope, rightDesignAnimate] = useAnimate();
    const [rightPointerScope, rightPointerAnimate] = useAnimate();
    
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    useEffect(() => {
        leftDesignAnimate([
            [leftDesignScope.current, { opacity: 1 }, { duration: 0.5 }],
            [leftDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
        ]);
        leftPointerAnimate([
            [leftPointerScope.current, { opacity: 1 }, { duration: 0.5 }],
            [leftPointerScope.current, { y: 0, x: -100 }, { duration: 0.5 }],
            [
                leftPointerScope.current,
                { x: 0, y: [0, 16, 0] },
                { duration: 0.5, ease: "easeInOut" },
            ],
        ]);

        rightDesignAnimate([
            [
                rightDesignScope.current,
                { opacity: 1 },
                { duration: 0.5, delay: 1.5 },
            ],
            [rightDesignScope.current, { x: 0, y: 0 }, { duration: 0.5 }],
        ]);
        rightPointerAnimate([
            [
                rightPointerScope.current,
                { opacity: 1 },
                { duration: 0.5, delay: 1.5 },
            ],
            [rightPointerScope.current, { x: 175, y: 0 }, { duration: 0.5 }],
            [
                rightPointerScope.current,
                { x: 0, y: [0, 20, 0] },
                { duration: 0.5 },
            ],
        ]);

        // Initialize EmailJS with your public key
        emailjs.init("8kJbRPm_u_JHB-zvx");
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            // Send automatic welcome email to user via EmailJS
            await emailjs.send(
                "KIKOstudio",
                "template_zi79rzg",
                {
                    to_email: email,
                    to_name: email.split("@")[0],
                    from_name: "KIKO Studio",
                    message: "Thank you for signing up! We're excited to have you on board.",
                }
            );

            // Send notification to you via Formspree
            await fetch("https://formspree.io/f/mzzjydpl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    _subject: "New Sign Up - KIKO Studio",
                }),
            });

            setSubmitStatus("success");
            setEmail("");
            
            // Reset success message after 3 seconds
            setTimeout(() => setSubmitStatus("idle"), 3000);
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitStatus("error");
            
            // Reset error message after 3 seconds
            setTimeout(() => setSubmitStatus("idle"), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            className="py-24 overflow-x-clip"
            style={{
                cursor: `url(${cursorYouImage.src}), auto`,
            }}
        >
            <div className="container relative">
                <motion.div
                    ref={leftDesignScope}
                    initial={{ opacity: 0, y: 100, x: -100 }}
                    drag
                    onDragEnd={() => {
                        leftDesignAnimate(
                            leftDesignScope.current,
                            { x: 0, y: 0 },
                            {
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                            }
                        );
                    }}
                    className="absolute -left-32 top-16 hidden lg:block"
                >
                    <Image
                        src={designExample1Image}
                        alt="Design example 1 image"
                        draggable="false"
                    />
                </motion.div>
                <motion.div
                    ref={leftPointerScope}
                    initial={{ opacity: 0, y: 100, x: -200 }}
                    className="absolute left-56 top-96 hidden lg:block"
                >
                    <Pointer name="Andrea" />
                </motion.div>

                <motion.div
                    ref={rightDesignScope}
                    initial={{ opacity: 0, x: 100, y: 100 }}
                    drag
                    onDragEnd={() => {
                        leftDesignAnimate(
                            rightDesignScope.current,
                            { x: 0, y: 0 },
                            {
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                            }
                        );
                    }}
                    className="absolute -right-64 -top-16 hidden lg:block"
                >
                    <Image
                        src={designExample2Image}
                        alt="Design example 2 image"
                        draggable="false"
                    />
                </motion.div>
                <motion.div
                    ref={rightPointerScope}
                    initial={{ opacity: 0, x: 275, y: 100 }}
                    className="absolute right-80 -top-4 hidden lg:block"
                >
                    <Pointer name="Bryan" color="red" />
                </motion.div>
                <div className="flex justify-center">
                    <div
                        className="inline-flex py-1 px-3 bg-gradient-to-r from-purple-400
            to-pink-400 rounded-full text-neutral-950 font-semibold"
                    >
                        ✨ 100% Satisfaction
                    </div>
                </div>

                <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-center mt-6">
                    Impactful designs created effortlessly
                </h1>

                <p className="text-center text-xl text-white/50 mt-8 max-w-2xl mx-auto">
                    Your website should be more than just a digital brochure. 
                    KIKO Studio creates customized solutions tailored to your business needs, 
                    helping you save time and stay focused on what truly matters.
                </p>

                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center mt-8 max-w-lg mx-auto"
                >
                    <div className="flex items-center border border-white/15 rounded-full p-2 w-full overflow-hidden">
                        <input
                            className="bg-transparent px-4 flex-1 min-w-0 text-sm md:text-base focus:outline-none w-full"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />
                        <Button
                            className="whitespace-nowrap flex-shrink-0"
                            type="submit"
                            variant="primary"
                            size="sm"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Signing Up..." : "Sign Up"}
                        </Button>
                    </div>
                    
                    {submitStatus === "success" && (
                        <p className="text-green-400 text-sm mt-2">
                            Successfully signed up! Check your email.
                        </p>
                    )}
                    
                    {submitStatus === "error" && (
                        <p className="text-red-400 text-sm mt-2">
                            Something went wrong. Please try again.
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}