export const metadata = {
  title: 'PBL Academy',
  description: 'The Worlds Only Proof based learning Place where you learn things by doing things and getting Hands-On Experience.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
