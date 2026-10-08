import MenuIcon from '@mui/icons-material/Menu'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ProfilePanel, PROFILE_PANEL_WIDTH } from '@/components/layout/ProfilePanel'
import { Sidebar, SIDEBAR_WIDTH } from '@/components/layout/Sidebar'
import { useAuth } from '@/features/auth/useAuth'

export function AppShell() {
  const { profile } = useAuth()
  const [navOpen, setNavOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar mobileOpen={navOpen} onClose={() => setNavOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            xs: '100%',
            md: `calc(100% - ${SIDEBAR_WIDTH}px)`,
            lg: `calc(100% - ${SIDEBAR_WIDTH + PROFILE_PANEL_WIDTH}px)`,
          },
          minWidth: 0,
        }}
      >
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: 'rgba(14, 23, 38, 0.92)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: { lg: 'none' },
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setNavOpen(true)}
              sx={{ mr: 1, display: { md: 'none' } }}
              aria-label="Open navigation"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
              {profile?.displayName ?? 'Portal'}
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => setProfileOpen(true)}
              aria-label="Open profile"
            >
              <PersonOutlinedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
          <Outlet />
        </Box>
      </Box>

      <ProfilePanel
        mobileOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </Box>
  )
}
