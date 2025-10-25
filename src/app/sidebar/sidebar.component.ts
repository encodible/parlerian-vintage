import {Component, OnInit} from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import {User} from '../auth/models/User';
import {CURRENT_USER, UaaService} from '../core';
import {Store} from '@ngrx/store';
import * as fromAuth from '../auth/reducers';
import * as AuthActions from '../auth/actions/auth.actions';
import {Permissions, PermissionsService} from '../permissions';
import {OrgRoleNames} from '../permissions/permissions';
import {ToastrService} from 'ngx-toastr';

declare const $: any;

// Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
    // {
    //     path: '/dashboard',
    //     title: 'Dashboard',
    //     type: 'link',
    //     icontype: 'dashboard'
    // },
    // {
    //     path: '/organization',
    //     title: 'Organization',
    //     type: 'link',
    //     icontype: 'business'
    // },
    {
        path: '/events',
        title: 'Events',
        type: 'link',
        icontype: 'event'
    },
    {
        path: '/people',
        title: 'People',
        type: 'sub',
        icontype: 'people',
        collapse: 'events-collapse',
        children: [
            {
                path: 'quick-search',
                title: 'Search',
                type: 'link',
                ab: 'S'
            },
            {
                path: 'advanced-search',
                title: 'Advanced Search',
                type: 'link',
                ab: 'AS'
            },
            {
                path: 'add',
                title: 'Add Person',
                type: 'link',
                ab: 'AP'
            }

        ]
    },
    {
        path: '/suborganizations',
        title: 'Assignments',
        type: 'sub',
        icontype: 'group_work',
        collapse: 'suborg-collapse',
        children: [
            {
                path: 'search',
                title: 'Name Search',
                type: 'link',
                ab: 'NS'
            },
            {
                path: 'list',
                title: 'Precinct Search',
                type: 'link',
                ab: 'PS'
            }
        ]
    },
    // {
    //     path: '/contacts',
    //     title: 'Contacts',
    //     type: 'link',
    //     icontype: 'contacts'
    // },
    // {
    //     path: '/assignments',
    //     title: 'Assignments',
    //     type: 'link',
    //     icontype: 'assignment_ind'
    // },
    // {
    //     path: '/permissions',
    //     title: 'Permissions',
    //     type: 'link',
    //     icontype: 'security'
    // },

];

export const REPORTING_ITEMS = [
    {
        path: '/reports',
        title: 'Reports',
        type: 'link',
        icontype: 'description'
    }
]


@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {

    public user: User = {username: '', accessToken: ''};
    public menuItems: any[];


    constructor(private uaa: UaaService,
                private permissionsService: PermissionsService,
                private store: Store<fromAuth.State>,
                private toastr: ToastrService) {
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.permissionsService.refreshPermissions()
            .subscribe(
                (perms) => {
                    console.log('got permissions', perms)
                    this.initializeMenuItems(perms)
                },
                (err) => {
                    console.error('Unable to get permissions', err)
                    this.toastr.error('Unable to get permissions')
                    this.uaa.logout()
                }
            )
    }

    initializeMenuItems(perms: Permissions) {
        this.menuItems = ROUTES.filter(menuItem => {
            return menuItem
        });
        if (perms && perms.organizationPermissions.includes(
            OrgRoleNames.ORGANIZATION_ADMINISTRATOR
        )) {
            this.menuItems = this.menuItems.concat(REPORTING_ITEMS)
        }
        this.updateUser();
    }

    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            const ps = new PerfectScrollbar(elemSidebar, {wheelSpeed: 2, suppressScrollX: true});
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    logoutHandler() {
        this.store.dispatch(new AuthActions.Logout());
    }

    updateUser() {
        const userFromStorage = JSON.parse(localStorage.getItem(CURRENT_USER));
        this.permissionsService.initializePermissions();
        this.user.username = userFromStorage.username;
    }
}
