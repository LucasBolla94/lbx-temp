'use client'

export default function DiscoverTransparency() {
  return (
    <section className="py-16 px-4 md:px-12 max-w-5xl mx-auto text-left">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[var(--green-200)]">
        Transparency & Governance
      </h2>

      <p className="text-[var(--gray-500)] text-lg leading-relaxed mb-4">
        Every action taken by the fund is subject to governance and publicly communicated to ensure full transparency with our community.
      </p>

      <ul className="list-disc list-inside space-y-3 text-[var(--gray-500)] text-lg leading-relaxed">
        <li>
          <span className="font-semibold text-[var(--gray-200)]">On-Chain Fund Wallet:</span> 
          All transactions go through the official wallet: 
          <span className="break-all text-[var(--green-400)]"> 5ArPQSA9vM7sukJzsFdkEnUzG5NALCDDcEm6Li5VoZRS</span>
        </li>
        <li>
          <span className="font-semibold text-[var(--gray-200)]">Governance Votes:</span> 
          Strategic decisions are submitted to token holders and voted on directly from the dashboard.
        </li>
        <li>
          <span className="font-semibold text-[var(--gray-200)]">Official Communication Channels:</span> 
          All decisions, updates and reports are shared on our public channels:
          <br />
          Telegram: <a href="https://t.me/lbxgroup_finance" target="_blank" className="underline text-[var(--green-200)]">t.me/lbxgroup_finance</a><br />
          X (Twitter): <a href="https://x.com/lbxfinance" target="_blank" className="underline text-[var(--green-200)]">x.com/lbxfinance</a>
        </li>
      </ul>
    </section>
  )
}
