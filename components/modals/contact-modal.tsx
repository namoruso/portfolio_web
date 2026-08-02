import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { useLanguage } from "@/providers/language-provider";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { useLenisModal } from "@/hooks/use-lenis-modal";
import { sanitizePhone } from "@/lib/utils";
import { ShineButton } from "@/components/ui/shine-button";

interface ContactModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
    const { content, dict } = useLanguage();
    useLenisModal(open);

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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={true}
                className="flex flex-col sm:max-w-[560px] max-h-[85vh] p-0 gap-0 border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden"
            >
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent z-10" />

                <div className="relative px-8 pt-8 pb-4 shrink-0">
                    <DialogHeader className="gap-3">
                        <DialogTitle className="text-2xl font-bold tracking-tight">
                            {dict.contactMe}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
                            {dict.contactModalDescription}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="overflow-y-auto px-8 pb-8 pt-2 flex-1" data-lenis-prevent="true">
                    <div className="flex flex-wrap gap-3 items-center mt-2">
                        {contactChannels.map((channel) => (
                            <ShineButton
                                key={channel.label}
                                href={channel.href}
                                target={channel.external ? "_blank" : "_self"}
                                className="h-10 px-5"
                                shineClassName="w-4 bg-background/20 dark:bg-background/20"
                            >
                                <span className="relative z-10 flex items-center gap-2 text-xs tracking-widest uppercase font-medium">
                                    {channel.icon && (
                                        <channel.icon className="w-3.5 h-3.5" aria-hidden="true" />
                                    )}
                                    {channel.label}
                                    <ArrowUpRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </span>
                            </ShineButton>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent z-10" />
            </DialogContent>
        </Dialog>
    );
}
