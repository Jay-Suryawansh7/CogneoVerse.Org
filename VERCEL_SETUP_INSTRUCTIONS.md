# Vercel Deployment Troubleshooting Guide

The error `No Next.js version detected` happens because Vercel is looking at the **Root Folder** of your repository, but your Next.js app lives inside the `apps/frontend` folder.

You **cannot** fix this by changing code. You must change a setting in the Vercel Dashboard.

## Step 1: Fix Root Directory
1.  Go to your Vercel Dashboard and open your project.
2.  Click on the **Settings** tab (top menu).
3.  Click on **General** (left sidebar).
4.  Find the **Root Directory** section.
5.  Click **Edit**.
6.  Type `frontend` (or `dashboard` if deploying the dashboard).
7.  Click **Save**.

## Step 2: Redeploy
1.  After saving the settings, go to the **Deployments** tab.
2.  You should see your failed deployment.
3.  Click the **three dots** (...) next to it or the **Redeploy** button.
4.  Uncheck "Use existing build cache" if asked.
5.  Click **Redeploy**.

## Why this is necessary
Your project is a "Monorepo". Vercel defaults to the top level, but it needs to be told to look inside the `frontend` folder or `dashboard` folder.
