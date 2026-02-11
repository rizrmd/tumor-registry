'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
                      <a
                        href={item.href}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg group ${isActive
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        {item.name}
                      </a>
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
                              <a
                                key={subitem.name}
                                href={subitem.href}
                                className={`flex items-center px-3 py-2 text-sm rounded-lg ${isSubActive
                                  ? 'bg-emerald-50 text-emerald-700 font-medium'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                  }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subitem.name}
                              </a>
                            );
                          })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </nav>

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
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Profil Saya
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Pengaturan
                    </a>
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