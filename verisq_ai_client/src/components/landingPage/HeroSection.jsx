import CampaignTag from "./CampaignTag"
import ExcuseRotator from "./ExcuseRotator"
import StatsRow from "./StatsRow"
import LarryQuote from "./LarryQuote"
import SignupForm from "./SignupForm"
import FeaturesStrip from "./FeaturesStrip"

function HeroSection() {
  return (
    <>
      {/* MAIN HERO */}
      <section className="landing-hero">
        {/* Left Content */}
        <div className="landing-hero-content">
          <CampaignTag />

          <h1 className="hero-headline">
            Stop making excuses.<br />
            <span>Start managing risk.</span>
          </h1>

          <ExcuseRotator />

          <p className="hero-description">
            Test-drive Verisq AI with <strong>5 vendors free</strong>.
            See real LiveThreat scores, not a demo. No credit card. No sales call.
            Just proof that TPRM doesn't require a dedicated team.
          </p>

          <StatsRow />
          <LarryQuote />
        </div>

        {/* Right Content */}
        <SignupForm />
      </section>

      {/* ✅ BLUE FEATURE STRIP GOES HERE */}
      <FeaturesStrip />
    </>
  )
}

export default HeroSection
