export type Priority = 'Low' | 'Medium' | 'High'
export type Status = 'Open' | 'In Progress' | 'Resolved'


export interface Comment {
user: string
text: string
at?: string
}


export interface Ticket {
id: number
title: string
customerName: string
email: string
description: string
priority: Priority
status: Status
createdAt: string // ISO
comments: Comment[]
}