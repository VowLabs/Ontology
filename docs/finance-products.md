# Financial product taxonomy

`Finance:Product` (`B:F:P`) classifies financial product types by economic function.
It is an extensible navigation taxonomy, not a legal classification or an
assertion that all categories are mutually exclusive. Provider type (bank,
insurer, broker, credit union or other lender) does not determine product type.

| Branch | Code | Coverage |
| --- | --- | --- |
| Account | `B:F:P:AC` | Bank accounts (current/checking, savings, term deposits, money market deposits), brokerage and custody accounts |
| Credit | `B:F:P:CR` | Credit and charge cards; mortgage, personal, vehicle, education, business and buy-now-pay-later loans; lines of credit; finance leases; trade and receivables finance |
| Investment:Equity | `B:F:P:IN:EQ` | Stock (common and preferred), depositary receipts |
| Investment:Debt security | `B:F:P:IN:DE` | Bonds, bills, notes, commercial paper, negotiable deposit certificates, asset-backed securities |
| Investment:Fund | `B:F:P:IN:FU` | Mutual, exchange-traded, closed-end and private funds |
| Investment:Derivative | `B:F:P:IN:DR` | Options, futures, forwards, swaps, contracts for difference, warrants |
| Investment:Structured | `B:F:P:IN:ST` | Structured notes and other packaged investment payoffs |
| Payment | `B:F:P:PA` | Debit cards, prepaid cards, electronic money accounts |
| Insurance | `B:F:P:IS` | Life, health, disability/income, property, liability, motor, travel, annuities |
| Retirement | `B:F:P:RE` | Pension arrangements and retirement account wrappers |
| Native digital asset | `B:F:P:DA` | Unbacked cryptoassets and stablecoins |

The requested concepts resolve to:

- Credit card: `B:F:P:CR:CA`.
- Loan: `B:F:P:CR:LN`.
- Mortgage: `B:F:P:CR:LN:MO`. A mortgage is a loan secured by real property,
  whether or not a bank provides it.
- Bank account: `B:F:P:AC:BA`.
- Stock: `B:F:P:IN:EQ:ST`; common `CO` and preferred `PR` are its children.

## Classification boundaries

Choose the most specific applicable product type. Record orthogonal dimensions
in application metadata rather than creating duplicate branches for every
combination. Such dimensions include issuer sector, jurisdiction, currency,
collateral, fixed/floating interest, listing venue, tax treatment, investment
strategy and tokenization. This release does not define answer properties for
those dimensions.

- A mortgage-backed security is `B:F:P:IN:DE:AB`; the underlying mortgage loans
  are `B:F:P:CR:LN:MO`.
- A money market deposit account is `B:F:P:AC:BA:MM`; a money market mutual fund
  is `B:F:P:IN:FU:MF` with a money-market strategy.
- A sovereign bond is `B:F:P:IN:DE:BO` with a government issuer. A convertible
  bond remains a bond; convertibility is an additional term.
- A real-estate ETF is `B:F:P:IN:FU:ET`. REIT treatment is a legal/tax feature:
  classify the actual corporate share or fund interest by its form.
- A private equity fund is `B:F:P:IN:FU:PF`; a direct private-company common
  share is `B:F:P:IN:EQ:ST:CO`.
- A retirement account is `B:F:P:RE:AC`; stocks and funds held inside it retain
  their own investment classifications. An annuity is `B:F:P:IS:AN` whether or
  not it is used for retirement.
- A tokenized bond remains `B:F:P:IN:DE:BO`. Digital representation alone does
  not make it a native cryptoasset. Stablecoin classification describes its
  value-targeting design, without asserting deposit status or redemption rights.
- Physical property and vehicles remain under `B:F:A`; exposure through a fund
  or derivative belongs to the relevant investment category.

## Compatibility and scope

These nodes are classification concepts with `Children`, including empty
children at terminal concepts. They intentionally have no `Scalar`, `Subjects`
or answer properties. A product type is distinct from a customer's account,
contract, holding or balance; this change does not add data-entry forms.

Existing bank-account (`B:F:BA`), payment-instrument (`B:F:PI`), wallet (`B:F:WA`),
generated wallet-account (`B:F:AC`) and insurance-enquiry (`B:IN`) records retain
their codes and meanings. No existing definitions move and no answer migration
is required. Applications may associate product classification codes with their
own records. No new linking property or implicit schema inheritance is introduced.

Ontology version `2.1.0` adds this vocabulary to `2.0.0`; consumers that pin an
exact catalogue version must explicitly adopt the new version. Compiled client
assets are owned by consuming projects and are not regenerated here. The HTTP
API loads its catalogue when the server is created, so a running instance must
be restarted to serve the new definitions. For a foreground development server,
stop it with Ctrl-C and run from the Vow workspace root:

```sh
npm --prefix VowLabs/Ontology start
```

The separation of loans, securities and derivatives is informed by the
[EDM Council FIBO domain structure](https://github.com/edmcouncil/fibo).
This compact application taxonomy does not implement FIBO, import its formal
relationships, or claim standards conformance or expert regulatory review.
