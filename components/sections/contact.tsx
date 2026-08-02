"use client";

import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { sanitizePhone } from "@/lib/utils";
import { ShineButton } from "@/components/ui/shine-button";

export default function Contact() {
    const { content, dict } = useLanguage();

    const contactChannels = [
        {
            label: dict.sendEmail,
            href: `mailto:${content.contact.email}`,
            icon: Mail,
            external: false,
        },
        {
            label: dict.directLine,
            href: `tel:${sanitizePhone(content.contact.phone)}`,
            icon: Phone,
            external: false,
        },
        ...content.social.map((link: { label: string; href: string }) => ({
            label: link.label,
            href: link.href,
            icon: null,
            external: true,
        })),
    ];

    return (
        <section className="relative pt-24 md:pt-32 xl:pt-48 bg-background overflow-hidden border-t border-border/50">

            <div className="container mx-auto px-container relative z-10">

                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

                    <div className="flex flex-col gap-4 mb-16 lg:mb-24">
                        <BlurReveal>
                            <span className="title-counter">
                                [005]
                            </span>
                        </BlurReveal>

                        <BlurReveal>
                            <h2 className="title">
                                {dict.title.contact}
                            </h2>
                        </BlurReveal>
                        <BlurReveal>
                            <p className="text-lg mt-3 max-w-xl italic font-medium tracking-tight text-foreground/60">
                                {dict.contactIntroText}
                            </p>
                        </BlurReveal>
                    </div>

                    <BlurReveal>
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 sm:mb-24 xl:mb-32">
                            {contactChannels.map((channel) => (
                                <ShineButton
                                    key={channel.label}
                                    href={channel.href}
                                    target={channel.external ? "_blank" : "_self"}
                                    className="h-14 px-8"
                                    shineClassName="w-6 bg-background/20 dark:bg-background/20"
                                >
                                    <span className="relative z-10 flex items-center gap-3 text-sm font-medium tracking-widest uppercase">
                                        {channel.icon && (
                                            <channel.icon className="w-4 h-4" aria-hidden="true" />
                                        )}
                                        {channel.label}
                                        <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </span>
                                </ShineButton>
                            ))}
                        </div>
                    </BlurReveal>
                </div>

                <div className="w-full flex flex-col md:flex-row items-center justify-center pb-12 xl:py-12 xl:border-t border-border/50 gap-4">

                    <div className="text-sm font-mono tracking-widest text-muted-foreground uppercase flex items-center gap-4">
                        <span>© 2026</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        <span>NICOLA AMORUSO. {dict.allRightsReserved}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
