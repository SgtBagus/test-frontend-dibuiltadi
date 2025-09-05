/* eslint-disable no-console */
import axios from 'axios'
import { execSync } from 'child_process'

import dotenv from 'dotenv'

dotenv.config()

async function notifyBuildSuccess() {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  const isProd = Boolean(process.env.IS_PROD)
  const appRole = process.env.APP_ROLE // admin || seller || agent || undefined

  if (!webhookUrl) {
    console.error('Webhook URL not found!')
    return
  }

  // Get the last commit message
  let commitMessage = 'No commit message'
  try {
    commitMessage = execSync('git log -1 --pretty=%B').toString().trim()
  } catch (error) {
    console.error('Error getting commit message:', error)
  }

  // Build the payload for Discord
  const payload = {
    content: `🚀 **Build successful!**\nProject deployed successfully on Vercel ${appRole ? appRole : ''} (${isProd ? 'Production' : 'Development'})! 🎉\n\nLast Commit: \n${commitMessage}`,
    username: 'VercelBot'
  }

  try {
    const response = await axios.post(webhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('Discord notification response:', response.data)
  } catch (error) {
    console.error('Error sending notification:', error)
  }
}

notifyBuildSuccess()
