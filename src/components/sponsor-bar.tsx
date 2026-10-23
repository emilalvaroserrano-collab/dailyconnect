import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SponsorContacts, type SponsorCard } from "@/components/contact-icons";
import { getSponsor } from "@/lib/connect.functions";
import { useConnect } from "@/lib/connect";
import { captureReferralFromUrl } from "@/lib/referral-cookie";

export function SponsorBar() {
  const href = useRouterState({ select: (state) => state.location.href });
  const { profile } = useConnect();
  const [card, setCard] = useState<SponsorCard | null>(null);

  useEffect(() => {
    const referral = captureReferralFromUrl();
    if (!referral || profile?.membershipStatus === "active") {
      setCard(null);
      return;
    }
    let cancel = false;
    void getSponsor({ data: { code: referral.code } })
      .then((next) => {
        if (!cancel) setCard(next);
      })
      .catch(() => {
        if (!cancel) setCard(null);
      });
    return () => {
      cancel = true;
    };
  }, [href, profile?.membershipStatus]);

  if (!card || profile?.membershipStatus === "active") return null;
  return <SponsorContacts card={card} />;
}