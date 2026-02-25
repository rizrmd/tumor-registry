'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { SyncIndicator } from '@/components/SyncIndicator';
import { syncService } from '@/services/sync.service';
import toast from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const latestReleaseLinks = {
    windows: 'https://github.com/rizrmd/tumor-registry/releases/latest/download/INAMSOS.exe',
    macos: 'https://github.com/rizrmd/tumor-registry/releases/latest/download/INAMSOS-macos-universal.zip',
    linux: 'https://github.com/rizrmd/tumor-registry/releases/latest/download/INAMSOS-linux-amd64.tar.gz',
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    {
      name: 'Data Pasien',
      href: '/patients',
      icon: '👥',
      roles: ['DATA_ENTRY', 'MEDICAL_OFFICER', 'RESEARCHER', 'CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER', 'OBSERVER'],
      submenu: [
        { name: 'Daftar Pasien', href: '/patients', roles: ['DATA_ENTRY', 'MEDICAL_OFFICER', 'RESEARCHER', 'CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER', 'OBSERVER'] },
        { name: 'Entry Data Baru', href: '/patients/new', roles: ['DATA_ENTRY', 'MEDICAL_OFFICER', 'CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER'] },
        // { name: 'Quality Check', href: '/patients/quality', roles: ['CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER'] },
      ]
    },
    {
      name: 'Follow-up & MSTS',
      href: '/follow-up',
      icon: '📅',
      roles: ['DATA_ENTRY', 'MEDICAL_OFFICER', 'CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER', 'OBSERVER'],
      submenu: [
        { name: '14-Visit Protocol', href: '/follow-up', roles: ['DATA_ENTRY', 'MEDICAL_OFFICER', 'CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER', 'OBSERVER'] },
        { name: 'MSTS Calculator', href: '/msts', roles: ['DATA_ENTRY', 'MEDICAL_OFFICER', 'CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER', 'OBSERVER'] },
        { name: 'Compliance Tracking', href: '/follow-up/compliance', roles: ['CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER'] },
        { name: 'Reminder Management', href: '/follow-up/reminders', roles: ['DATA_ENTRY', 'MEDICAL_OFFICER', 'CENTER_ADMIN', 'HEAD_OF_CENTER'] },
      ]
    },
    {
      name: 'Penelitian',
      href: '/research',
      icon: '🔬',
      roles: ['RESEARCHER', 'CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER', 'OBSERVER', 'DATA_ENTRY'],
      submenu: [
        { name: 'Browse Data', href: '/research', roles: ['RESEARCHER', 'CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER', 'OBSERVER', 'DATA_ENTRY'] },
        { name: 'Laporan', href: '/reports', roles: ['RESEARCHER', 'CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER', 'OBSERVER', 'DATA_ENTRY'] },
        { name: 'Permintaan Data', href: '/research/requests', roles: ['RESEARCHER', 'CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER'] },
      ]
    },
    {
      name: 'Persetujuan',
      href: '/approvals',
      icon: '✅',
      roles: ['CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER'],
      submenu: [
        { name: 'Antrian Permintaan', href: '/approvals', roles: ['CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER'] },
        { name: 'Riwayat Persetujuan', href: '/approvals/history', roles: ['CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER'] },
      ]
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: '📈',
      roles: ['DATA_ENTRY', 'MEDICAL_OFFICER', 'RESEARCHER', 'CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER', 'OBSERVER'],
      // Submenus removed for National Dashboard overhaul
    },
    {
      name: 'Administrasi',
      href: '/admin',
      icon: '⚙️',
      roles: ['CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER'],
      submenu: [
        { name: 'User Management', href: '/admin/users', roles: ['CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER'] },
        { name: 'Center Management', href: '/admin/centers', roles: ['NATIONAL_ADMIN', 'SYSTEM_ADMIN'] },
        { name: 'Audit Logs', href: '/admin/audit', roles: ['CENTER_ADMIN', 'NATIONAL_ADMIN', 'SYSTEM_ADMIN', 'HEAD_OF_CENTER'] },
        { name: 'Konfigurasi', href: '/admin/config', roles: ['NATIONAL_ADMIN', 'SYSTEM_ADMIN'] },
      ]
    },
    { name: 'Pengaturan', href: '/settings', icon: '🔧' },
  ];

  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter(item => {
    if (!item.roles) return true;
    return user?.role && item.roles.includes(user.role);
  });

  const getRoleLabel = (role: string) => {
    const roleLabels: Record<string, string> = {
      // Legacy lowercase
      data_entry: 'Data Entry',
      doctor: 'Dokter',
      nurse: 'Perawat',
      researcher: 'Peneliti',
      admin: 'Administrator',
      super_admin: 'Super Admin',
      national_stakeholder: 'Stakeholder Nasional',

      // Actual DB roles
      SYSTEM_ADMIN: 'Admin Pusat',
      NATIONAL_ADMIN: 'National Administrator',
      CENTER_ADMIN: 'Center Administrator',
      RESEARCHER: 'Researcher',
      DATA_ENTRY: 'Staff Input',
      MEDICAL_OFFICER: 'Medical Officer',
      HEAD_OF_CENTER: 'Kepala Center',
      OBSERVER: 'Observer',
    };
    return roleLabels[role] || role;
  };

  // Get current page title based on pathname
  const getPageTitle = () => {
    // Check main menu
    const page = navigation.find(item => item.href === pathname);
    if (page) return page.name;

    // Check submenus
    for (const item of navigation) {
      if (item.submenu) {
        const subpage = item.submenu.find(sub => sub.href === pathname);
        if (subpage) return subpage.name;
      }
    }

    return 'Dashboard';
  };

  // Toggle submenu expansion
  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuName)
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  // Check if menu or submenu is active
  const isMenuActive = (item: any) => {
    if (item.href === pathname) return true;
    if (item.submenu) {
      return item.submenu.some((sub: any) => sub.href === pathname);
    }
    return false;
  };

  // Auto-expand active menu on mount and pathname change
  React.useEffect(() => {
    const activeMenu = navigation.find(item => {
      if (item.submenu) {
        return item.submenu.some((sub: any) => sub.href === pathname);
      }
      return false;
    });

    if (activeMenu && !expandedMenus.includes(activeMenu.name)) {
      setExpandedMenus(prev => [...prev, activeMenu.name]);
    }
    setIsInitialized(true);
  }, [pathname]);

  // Auto Sync Logic
  useEffect(() => {
    // function to handle online status
    const handleOnline = () => {
      console.log('Network online detected. Starting sync...');
      toast.promise(syncService.runFullSync(), {
        loading: 'Connection restored. Syncing data...',
        success: 'Data synchronized successfully',
        error: 'Sync failed (will retry later)',
      });
    };

    window.addEventListener('online', handleOnline);

    // Initial check
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      // Optional: trigger silent sync on load?
      // syncService.runFullSync().catch(() => {});
    }

    // Periodic Sync (every 5 minutes)
    const syncInterval = setInterval(() => {
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        console.log('Running scheduled sync...');
        syncService.runFullSync().catch(err => console.error('Scheduled sync failed', err));
      }
    }, 5 * 60 * 1000);

    return () => {
      window.removeEventListener('online', handleOnline);
      clearInterval(syncInterval);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              <span className="text-gray-700 font-medium">Loading...</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-200 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-emerald-600 border-b border-emerald-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-emerald-600 font-bold text-lg">I</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">INAMSOS</h1>
                <p className="text-emerald-100 text-xs">Musculoskeletal Tumor Registry</p>
              </div>
            </div>
          </div>



          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {isLoading ? (
              <div className="space-y-3 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center px-3 py-2 space-x-3">
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-100 rounded w-24"></div>
                  </div>
                ))}
              </div>
            ) : (
              filteredNavigation.map((item) => {
                const isActive = isMenuActive(item);
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                const isExpanded = expandedMenus.includes(item.name);

                return (
                  <div key={item.name}>
                    {/* Main menu item */}
                    {hasSubmenu ? (
                      <button
                        onClick={() => toggleMenu(item.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg group ${isActive
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                      >
                        <div className="flex items-center">
                          <span className="mr-3 text-lg">{item.icon}</span>
                          {item.name}
                        </div>
                        <svg
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg group ${isActive
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        {item.name}
                      </Link>
                    )}

                    {/* Submenu items */}
                    {hasSubmenu && isExpanded && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.submenu
                          .filter((subitem: any) => {
                            if (!subitem.roles) return true;
                            return user?.role && subitem.roles.includes(user.role);
                          })
                          .map((subitem: any) => {
                            const isSubActive = pathname === subitem.href;
                            return (
                              <Link
                                key={subitem.name}
                                href={subitem.href}
                                className={`flex items-center px-3 py-2 text-sm rounded-lg ${isSubActive
                                  ? 'bg-emerald-50 text-emerald-700 font-medium'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                  }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subitem.name}
                              </Link>
                            );
                          })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </nav>

          {/* Latest release downloads */}
          <div className="px-4 pb-4">
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Download Versi Terbaru
              </p>
              <div className="mt-2 space-y-2">
                <a
                  href={latestReleaseLinks.windows}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-gray-500 fill-current">
                    <path d="M1 3.5 11 2v9H1zm11 0L23 2v9H12zM1 12h10v10L1 20.5zm11 0h11v8.5L12 22z" />
                  </svg>
                  Windows
                </a>
                <a
                  href={latestReleaseLinks.macos}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-gray-500 fill-current">
                    <path d="M16.37 1.43c.05 1.14-.35 2.2-1.01 2.97-.68.8-1.8 1.41-2.9 1.33-.14-1.1.36-2.28 1.02-3 .72-.8 1.92-1.4 2.89-1.3Zm3.4 16.2c-.53 1.21-.79 1.75-1.47 2.8-.95 1.45-2.29 3.25-3.95 3.27-1.47.02-1.85-.95-3.84-.94-1.99.01-2.4.96-3.86.95-1.66-.02-2.92-1.64-3.87-3.09-2.66-4.04-2.94-8.77-1.3-11.29 1.16-1.78 3-2.82 4.72-2.82 1.76 0 2.86.96 4.3.96 1.4 0 2.26-.96 4.28-.96 1.53 0 3.16.84 4.32 2.3-3.78 2.08-3.16 7.44.67 8.82Z" />
                  </svg>
                  macOS
                </a>
                <a
                  href={latestReleaseLinks.linux}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-gray-500 fill-current">
                    <path d="M14.62 8.35c-.42.28-.86.52-1.33.73a.97.97 0 0 1-.39.09c-.32 0-.64-.23-.88-.74a3.04 3.04 0 0 1-.26-1.28c0-.31.04-.59.13-.82.08-.23.2-.4.34-.52.15-.12.32-.18.52-.18.17 0 .34.05.49.16.16.1.29.25.4.44.11.18.2.4.27.65.07.25.1.52.1.82 0 .12 0 .24-.02.35.22-.13.44-.27.65-.43.18-.13.36-.2.53-.2.22 0 .38.11.5.32.1.18.16.4.16.65 0 .29-.07.55-.2.78-.14.24-.34.43-.61.58ZM9.28 8.19c.2.16.42.3.65.43-.01-.11-.02-.23-.02-.35 0-.3.03-.57.1-.82.07-.25.16-.47.27-.65.11-.19.24-.34.4-.44a.83.83 0 0 1 .49-.16c.2 0 .37.06.52.18.14.12.26.3.34.52.09.23.13.51.13.82 0 .46-.09.89-.26 1.28-.24.51-.56.74-.88.74a.97.97 0 0 1-.39-.09 7.08 7.08 0 0 1-1.33-.73c-.27-.15-.47-.34-.61-.58a1.53 1.53 0 0 1-.2-.78c0-.25.06-.47.16-.65.12-.21.28-.32.5-.32.17 0 .35.07.53.2Zm9.41 6.99c0 3.06-1.64 5.31-3.9 5.31-.74 0-1.43-.23-2.03-.66-.24-.17-.5-.26-.76-.26s-.52.09-.76.26c-.6.43-1.29.66-2.03.66-2.26 0-3.9-2.25-3.9-5.31 0-1.22.27-2.37.75-3.32.67-1.32 1.78-2.2 3.1-2.2.84 0 1.52.28 2.1.76.2.17.44.25.68.25s.48-.08.68-.25c.58-.48 1.26-.76 2.1-.76 1.32 0 2.43.88 3.1 2.2.48.95.75 2.1.75 3.32Z" />
                  </svg>
                  Linux
                </a>
              </div>
            </div>
          </div>

          {/* User info */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.role && getRoleLabel(user.role)}
                </p>
                {user?.centerName && (
                  <p className="text-xs text-gray-500 truncate">
                    {user.centerName}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:pl-64 h-screen">
        {/* Top navigation bar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Page title */}
            <div className="flex-1 flex items-center justify-between">
              <div className="max-w-lg">
                <h2 className="text-2xl font-semibold text-gray-900">{getPageTitle()}</h2>
              </div>
            </div>

            {/* Sync Indicator and User menu */}
            <div className="flex items-center space-x-4">
              {/* Sync Indicator */}
              <SyncIndicator />

              <div className="relative">
                <button
                  type="button"
                  className="flex items-center space-x-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 p-2"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 text-sm font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                  <svg className="hidden md:block h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Profil Saya
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Pengaturan
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
