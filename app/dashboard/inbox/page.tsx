export default function InboxPage() {
  return (
    <div className="container-width section-padding py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground mt-2">Manage your inbox and communications</p>
        </div>

        {/* Coming Soon */}
        <div className="text-center py-16">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
              <div className="text-4xl">📧</div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Inbox Coming Soon</h2>
              <p className="text-muted-foreground">
                The messaging system is currently under development. You'll be able to manage contact form submissions
                and reader messages here.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <strong>Planned features:</strong>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Contact form submissions</li>
                <li>• Newsletter subscriber management</li>
                <li>• Comment notifications</li>
                <li>• Reader feedback and messages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
