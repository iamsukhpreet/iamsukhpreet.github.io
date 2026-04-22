import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconPinterest from "@/assets/icons/IconPinterest.svg";
import IconCalendar from "@/assets/icons/IconCalendar.svg";
import IconSearch from "@/assets/icons/IconSearch.svg"; // Using Search as fallback for some
import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/sukhpreetkaur25.sk/",
    linkTitle: `${SITE.title} on Instagram`,
    icon: IconFacebook, // Fallback to Facebook icon for Instagram as we don't have Instagram icon
  },
  {
    name: "Mail",
    href: "mailto:support@iamsukhpreet.com",
    linkTitle: `Send an email to ${SITE.title}`,
    icon: IconMail,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/917568592988",
    linkTitle: `${SITE.title} on WhatsApp`,
    icon: IconWhatsapp,
  },
  {
    name: "Phone",
    href: "tel:+917568592988",
    linkTitle: `Call ${SITE.title}`,
    icon: IconSearch, // Fallback for Phone
  },
  {
    name: "Calendar",
    href: "https://booking.iamsukhpreet.com/sukhpreet-kaur/book-a-session",
    linkTitle: `Book a Session with ${SITE.title}`,
    icon: IconCalendar,
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: `Share this post via WhatsApp`,
    icon: IconWhatsapp,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: `Share this post on Facebook`,
    icon: IconFacebook,
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share this post on X`,
    icon: IconBrandX,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Share this post via Telegram`,
    icon: IconTelegram,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: `Share this post on Pinterest`,
    icon: IconPinterest,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    icon: IconMail,
  },
] as const;
