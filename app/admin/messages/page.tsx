"use client"

import * as React from "react"
import { 
  Mail, 
  Calendar,
  CheckCircle,
  Circle,
  Reply,
  Search
} from "lucide-react"
import { getContactSubmissions, updateContactStatus, ContactSubmission } from "@/lib/store-migration"
import { cn } from "@/lib/utils"

export default function AdminMessages() {
  const [messages, setMessages] = React.useState<ContactSubmission[]>([])
  const [selectedMessage, setSelectedMessage] = React.useState<ContactSubmission | null>(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filter, setFilter] = React.useState<'all' | 'new' | 'read' | 'replied'>('all')

  const loadMessages = React.useCallback(async () => {
    const allMessages = await getContactSubmissions()
    if (Array.isArray(allMessages)) {
      // Sort by date, newest first
      allMessages.sort((a, b) => new Date(b.created_at || b.createdAt).getTime() - new Date(a.created_at || a.createdAt).getTime())
      setMessages(allMessages)
      
      // Select first message if none selected
      if (!selectedMessage && allMessages.length > 0) {
        setSelectedMessage(allMessages[0])
      }
    }
  }, [selectedMessage])

  React.useEffect(() => {
    loadMessages()
  }, [loadMessages])

  const handleStatusChange = async (id: string, status: ContactSubmission['status']) => {
    await updateContactStatus(id, status)
    await loadMessages()
    
    // Update selected message if it's the one being changed
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, status })
    }
  }

  const filteredMessages = messages.filter(message => {
    // Apply status filter
    if (filter !== 'all' && message.status !== filter) return false
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      return (
        message.name.toLowerCase().includes(search) ||
        message.email.toLowerCase().includes(search) ||
        message.message.toLowerCase().includes(search)
      )
    }
    
    return true
  })

  const getStatusIcon = (status: ContactSubmission['status']) => {
    switch (status) {
      case 'new':
        return <Circle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      case 'read':
        return <CheckCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      case 'replied':
        return <Reply className="w-4 h-4 text-green-600 dark:text-green-400" />
    }
  }

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date
      if (!dateObj || isNaN(dateObj.getTime())) {
        return 'Invalid date'
      }
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(dateObj)
    } catch {
      return 'Invalid date'
    }
  }

  return (
    <div className="h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Messages</h1>
        <p className="text-muted-foreground">
          Manage contact form submissions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-8rem)]">
        {/* Messages List */}
        <div className="lg:col-span-1 glass-card rounded-2xl p-4 overflow-hidden flex flex-col">
          {/* Search and Filter */}
          <div className="mb-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-zinc-600"
              />
            </div>
            
            <div className="flex gap-2">
              {(['all', 'new', 'read', 'replied'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors",
                    filter === f
                      ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                      : "bg-gray-100 dark:bg-zinc-800/50 hover:bg-gray-200 dark:hover:bg-zinc-800"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No messages found
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={cn(
                    "p-3 rounded-xl cursor-pointer transition-colors",
                    selectedMessage?.id === message.id
                      ? "bg-gray-100 dark:bg-zinc-800"
                      : "hover:bg-gray-50 dark:hover:bg-zinc-800/50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getStatusIcon(message.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium truncate">{message.name}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{message.email}</p>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {message.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 overflow-hidden flex flex-col">
          {selectedMessage ? (
            <>
              {/* Message Header */}
              <div className="border-b border-gray-200 dark:border-zinc-800 pb-4 mb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{selectedMessage.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {selectedMessage.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {selectedMessage.status === 'new' && (
                      <button
                        onClick={() => handleStatusChange(selectedMessage.id, 'read')}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium"
                      >
                        Mark as Read
                      </button>
                    )}
                    {selectedMessage.status === 'read' && (
                      <button
                        onClick={() => handleStatusChange(selectedMessage.id, 'replied')}
                        className="px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors text-sm font-medium text-green-700 dark:text-green-400"
                      >
                        Mark as Replied
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-200 dark:border-zinc-800 pt-4 mt-4">
                <div className="flex gap-3">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    <Reply className="w-4 h-4" />
                    Reply via Email
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a message to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}