import { AcademicCapIcon, BriefcaseIcon, UserGroupIcon, ClipboardDocumentListIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export type CarouselType = {
    name: string;
    title?: string;
    object: JSX.Element;
}

export type pageListType = {
    label: string;
    href: string;
    pricingTier?: string;
    icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>>;
    subLink?: pageListType
}

export const linkData = {
    publicLinks: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Blog', href: '/blog' },
    ],
    signedInLinks: [
        {
            label: 'AI Career Coach',
            href: '/eve',
            pricingTier: 'PRO',
            icon: AcademicCapIcon
        },
        {
            label: 'Job Application Tracker',
            href: '/board',
            pricingTier: 'free',
            icon: ClipboardDocumentListIcon
        },
    ],
    productLinks: [
        {
            label: 'Resume Builder',
            href: '/resumebuilder',
            icon: BriefcaseIcon,
            pricingTier: 'free'
        },
        {
            label: 'LinkedIn Bio',
            href: '/bio',
            icon: UserGroupIcon,
            pricingTier: 'free'
        },
        {
            label: 'Elevator Pitch',
            href: '/pitch',
            icon: ChartBarIcon,
            pricingTier: 'free'
        },
        {
            label: 'Networking (beta)',
            href: '/networking',
            pricingTier: 'PRO',
            icon: UserGroupIcon
        },
        {
            label: 'Jobs (beta)',
            href: '/jobs',
            pricingTier: 'PRO',
            icon: BriefcaseIcon
        },
    ],
    signedInMenuLinks: [
        { label: 'Profile', href: '/profile' }, // Note: Adjust the href dynamically based on userId
        { label: 'Manage Subscription', href: 'https://billing.stripe.com/p/login/fZedQQbuK5Ke2Q06oo' },
    ]
};

export type SideBarItem = {
    id: string;
    title: string;
    href: string;
    editable: boolean;
    category: string;
    itemUrl?: string;
    date?: string;
}