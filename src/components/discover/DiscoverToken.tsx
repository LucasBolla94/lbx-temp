'use client'

export default function DiscoverToken() {
  return (
    <section className="py-16 px-4 md:px-12 max-w-5xl mx-auto text-left">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[var(--green-200)]">
        The LBX Token
      </h2>

      <p className="text-[var(--gray-500)] text-lg leading-relaxed mb-4">
        The LBX token is more than just an asset &mdash; it represents direct participation in the fund. 
        Each token holder becomes part of the ecosystem and benefits from its growth.
      </p>

      <ul className="list-disc list-inside space-y-3 text-[var(--gray-500)] text-lg leading-relaxed">
        <li>
          <span className="font-semibold text-[var(--gray-200)]">Governance Power:</span> 
          Vote on strategic decisions through the dashboard. Your voice helps shape the fund&rsquo;s direction.
        </li>
        <li>
          <span className="font-semibold text-[var(--gray-200)]">Real Yield Backing:</span> 
          Token appreciation is driven by real profits, not hype. Weekly dividends increase the token&rsquo;s value over time.
        </li>
        <li>
          <span className="font-semibold text-[var(--gray-200)]">Controlled Inflation:</span> 
          New tokens are minted only when the fund has cash in hand &mdash; under strict management and community visibility.
        </li>
      </ul>
    </section>
  )
}
