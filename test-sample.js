
import fs from "fs";
// import { runMobileAudit } from "./index.js";
import { runMobileAudit } from "../mobile_assibility_lib/dist/index.js";

// const sampleXml = fs.readFileSync("./sample-ui.xml", "utf-8");

const sampleXml = `
<?xml version='1.0' encoding='UTF-8' standalone='yes'?>
<hierarchy rotation="0">
    <node index="0" text="" resource-id="" class="android.widget.FrameLayout"
        package="in.amazon.mShop.android.shopping" content-desc="" checkable="false" checked="false"
        clickable="false" enabled="true" focusable="false" focused="false" scrollable="false"
        long-clickable="false" password="false" selected="false" bounds="[0,0][1080,2408]">
        <node index="0" text="" resource-id="" class="android.widget.LinearLayout"
            package="in.amazon.mShop.android.shopping" content-desc="" checkable="false"
            checked="false" clickable="false" enabled="true" focusable="false" focused="false"
            scrollable="false" long-clickable="false" password="false" selected="false"
            bounds="[0,0][1080,2408]">
            <node index="0" text="" resource-id="android:id/content"
                class="android.widget.FrameLayout" package="in.amazon.mShop.android.shopping"
                content-desc="" checkable="false" checked="false" clickable="false" enabled="true"
                focusable="false" focused="false" scrollable="false" long-clickable="false"
                password="false" selected="false" bounds="[0,0][1080,2408]">
                <node index="0" text=""
                    resource-id="in.amazon.mShop.android.shopping:id/qtips_framelayout"
                    class="android.widget.RelativeLayout" package="in.amazon.mShop.android.shopping"
                    content-desc="" checkable="false" checked="false" clickable="false"
                    enabled="true" focusable="false" focused="false" scrollable="false"
                    long-clickable="false" password="false" selected="false"
                    bounds="[0,0][1080,2408]" />
                <node index="1" text=""
                    resource-id="in.amazon.mShop.android.shopping:id/root_container"
                    class="android.view.ViewGroup" package="in.amazon.mShop.android.shopping"
                    content-desc="" checkable="false" checked="false" clickable="false"
                    enabled="true" focusable="false" focused="false" scrollable="false"
                    long-clickable="false" password="false" selected="false"
                    bounds="[0,70][1080,2273]">
                    <node index="0" text=""
                        resource-id="in.amazon.mShop.android.shopping:id/overlay_container"
                        class="android.widget.FrameLayout"
                        package="in.amazon.mShop.android.shopping" content-desc="" checkable="false"
                        checked="false" clickable="false" enabled="true" focusable="false"
                        focused="false" scrollable="false" long-clickable="false" password="false"
                        selected="false" bounds="[0,70][1080,2273]" />
                    <node index="1" text=""
                        resource-id="in.amazon.mShop.android.shopping:id/program_container"
                        class="android.widget.FrameLayout"
                        package="in.amazon.mShop.android.shopping" content-desc="" checkable="false"
                        checked="false" clickable="false" enabled="true" focusable="false"
                        focused="false" scrollable="false" long-clickable="false" password="false"
                        selected="false" bounds="[0,70][1080,2273]">
                        <node index="0" text=""
                            resource-id="in.amazon.mShop.android.shopping:id/program_root"
                            class="android.view.ViewGroup"
                            package="in.amazon.mShop.android.shopping" content-desc=""
                            checkable="false" checked="false" clickable="false" enabled="true"
                            focusable="false" focused="false" scrollable="false"
                            long-clickable="false" password="false" selected="false"
                            bounds="[0,70][1080,2273]">
                            <node index="0" text=""
                                resource-id="in.amazon.mShop.android.shopping:id/subnav_container"
                                class="android.widget.LinearLayout"
                                package="in.amazon.mShop.android.shopping" content-desc=""
                                checkable="false" checked="false" clickable="false" enabled="true"
                                focusable="false" focused="false" scrollable="false"
                                long-clickable="false" password="false" selected="false"
                                bounds="[0,70][1080,239]" />
                            <node index="1" text=""
                                resource-id="in.amazon.mShop.android.shopping:id/top_container"
                                class="android.widget.LinearLayout"
                                package="in.amazon.mShop.android.shopping" content-desc=""
                                checkable="false" checked="false" clickable="false" enabled="true"
                                focusable="false" focused="false" scrollable="false"
                                long-clickable="false" password="false" selected="false"
                                bounds="[0,70][1080,239]">
                                <node index="0" text=""
                                    resource-id="in.amazon.mShop.android.shopping:id/configurable_action_bar_view"
                                    class="android.widget.LinearLayout"
                                    package="in.amazon.mShop.android.shopping" content-desc=""
                                    checkable="false" checked="false" clickable="false"
                                    enabled="true" focusable="false" focused="false"
                                    scrollable="false" long-clickable="false" password="false"
                                    selected="false" bounds="[0,70][1080,239]">
                                    <node index="0" text="" resource-id=""
                                        class="android.widget.RelativeLayout"
                                        package="in.amazon.mShop.android.shopping" content-desc=""
                                        checkable="false" checked="false" clickable="false"
                                        enabled="true" focusable="false" focused="false"
                                        scrollable="false" long-clickable="false" password="false"
                                        selected="false" bounds="[0,70][1080,239]">
                                        <node index="0" text=""
                                            resource-id="in.amazon.mShop.android.shopping:id/chrome_search_box"
                                            class="android.widget.ImageButton"
                                            package="in.amazon.mShop.android.shopping"
                                            content-desc="Search" checkable="false" checked="false"
                                            clickable="true" enabled="true" focusable="true"
                                            focused="false" scrollable="false"
                                            long-clickable="false" password="false" selected="false"
                                            bounds="[0,70][1080,239]">
                                            <node index="0" text=""
                                                resource-id="in.amazon.mShop.android.shopping:id/chrome_search_edit_frame"
                                                class="android.widget.LinearLayout"
                                                package="in.amazon.mShop.android.shopping"
                                                content-desc="" checkable="false" checked="false"
                                                clickable="false" enabled="true" focusable="false"
                                                focused="false" scrollable="false"
                                                long-clickable="false" password="false"
                                                selected="false" bounds="[34,98][956,222]">
                                                <node index="0" text=""
                                                    resource-id="in.amazon.mShop.android.shopping:id/chrome_action_bar_search_disabled"
                                                    class="android.widget.ImageButton"
                                                    package="in.amazon.mShop.android.shopping"
                                                    content-desc="Search" checkable="false"
                                                    checked="false" clickable="false" enabled="true"
                                                    focusable="false" focused="false"
                                                    scrollable="false" long-clickable="false"
                                                    password="false" selected="false"
                                                    bounds="[62,126][130,194]">
                                                    <node index="0" text=""
                                                        resource-id="in.amazon.mShop.android.shopping:id/chrome_action_bar_search_icon"
                                                        class="android.widget.ImageView"
                                                        package="in.amazon.mShop.android.shopping"
                                                        content-desc="" checkable="false"
                                                        checked="false" clickable="false"
                                                        enabled="true" focusable="false"
                                                        focused="false" scrollable="false"
                                                        long-clickable="false" password="false"
                                                        selected="false" bounds="[62,126][130,194]" />
                                                </node>
                                                <node index="1" text="Search Amazon.in"
                                                    resource-id="in.amazon.mShop.android.shopping:id/chrome_search_hint_view"
                                                    class="android.widget.TextView"
                                                    package="in.amazon.mShop.android.shopping"
                                                    content-desc="" checkable="false"
                                                    checked="false" clickable="false" enabled="true"
                                                    focusable="false" focused="false"
                                                    scrollable="false" long-clickable="false"
                                                    password="false" selected="false"
                                                    bounds="[153,98][832,222]" />
                                                <node index="2" text=""
                                                    resource-id="in.amazon.mShop.android.shopping:id/chrome_camera_icon_cxi_inside"
                                                    class="android.widget.FrameLayout"
                                                    package="in.amazon.mShop.android.shopping"
                                                    content-desc="scan it" checkable="false"
                                                    checked="false" clickable="true" enabled="true"
                                                    focusable="true" focused="false"
                                                    scrollable="false" long-clickable="false"
                                                    password="false" selected="false"
                                                    bounds="[832,98][956,222]">
                                                    <node index="0" text=""
                                                        resource-id="in.amazon.mShop.android.shopping:id/chrome_action_bar_camera_icon"
                                                        class="android.widget.ImageView"
                                                        package="in.amazon.mShop.android.shopping"
                                                        content-desc="" checkable="false"
                                                        checked="false" clickable="false"
                                                        enabled="true" focusable="false"
                                                        focused="false" scrollable="false"
                                                        long-clickable="false" password="false"
                                                        selected="false" bounds="[860,126][928,194]" />
                                                </node>
                                            </node>
                                            <node index="1" text=""
                                                resource-id="in.amazon.mShop.android.shopping:id/chrome_scan_icon_cxi_outside"
                                                class="android.widget.FrameLayout"
                                                package="in.amazon.mShop.android.shopping"
                                                content-desc="scan it" checkable="false"
                                                checked="false" clickable="true" enabled="true"
                                                focusable="true" focused="false" scrollable="false"
                                                long-clickable="false" password="false"
                                                selected="false" bounds="[956,70][1080,239]">
                                                <node index="0" text=""
                                                    resource-id="in.amazon.mShop.android.shopping:id/chrome_action_bar_scan_icon"
                                                    class="android.widget.ImageView"
                                                    package="in.amazon.mShop.android.shopping"
                                                    content-desc="" checkable="false"
                                                    checked="false" clickable="false" enabled="true"
                                                    focusable="false" focused="false"
                                                    scrollable="false" long-clickable="false"
                                                    password="false" selected="false"
                                                    bounds="[984,120][1052,188]" />
                                            </node>
                                        </node>
                                    </node>
                                </node>
                            </node>
                            <node index="2" text=""
                                resource-id="in.amazon.mShop.android.shopping:id/fragment_switch_view_container"
                                class="android.widget.FrameLayout"
                                package="in.amazon.mShop.android.shopping" content-desc=""
                                checkable="false" checked="false" clickable="false" enabled="true"
                                focusable="false" focused="false" scrollable="false"
                                long-clickable="false" password="false" selected="false"
                                bounds="[0,239][1080,2273]">
                                <node index="0" text=""
                                    resource-id="in.amazon.mShop.android.shopping:id/mshop_webView_container"
                                    class="android.widget.FrameLayout"
                                    package="in.amazon.mShop.android.shopping" content-desc=""
                                    checkable="false" checked="false" clickable="false"
                                    enabled="true" focusable="false" focused="false"
                                    scrollable="false" long-clickable="false" password="false"
                                    selected="false" bounds="[0,239][1080,2115]">
                                    <node index="0" text="" resource-id=""
                                        class="android.widget.RelativeLayout"
                                        package="in.amazon.mShop.android.shopping" content-desc=""
                                        checkable="false" checked="false" clickable="false"
                                        enabled="true" focusable="false" focused="false"
                                        scrollable="false" long-clickable="false" password="false"
                                        selected="false" bounds="[0,363][1080,2115]">
                                        <node index="0" text=""
                                            resource-id="in.amazon.mShop.android.shopping:id/mash_web_fragment"
                                            class="android.widget.RelativeLayout"
                                            package="in.amazon.mShop.android.shopping"
                                            content-desc="" checkable="false" checked="false"
                                            clickable="false" enabled="true" focusable="false"
                                            focused="false" scrollable="false"
                                            long-clickable="false" password="false" selected="false"
                                            bounds="[0,363][1080,2115]">
                                            <node NAF="true" index="0" text="" resource-id=""
                                                class="android.webkit.WebView"
                                                package="in.amazon.mShop.android.shopping"
                                                content-desc="" checkable="false" checked="false"
                                                clickable="true" enabled="true" focusable="true"
                                                focused="true" scrollable="false"
                                                long-clickable="false" password="false"
                                                selected="false" bounds="[0,363][1080,2115]" />
                                        </node>
                                    </node>
                                    <node index="1" text="" resource-id=""
                                        class="android.widget.LinearLayout"
                                        package="in.amazon.mShop.android.shopping" content-desc=""
                                        checkable="false" checked="false" clickable="false"
                                        enabled="true" focusable="false" focused="false"
                                        scrollable="false" long-clickable="false" password="false"
                                        selected="false" bounds="[0,239][1080,363]">
                                        <node index="0" text=""
                                            resource-id="in.amazon.mShop.android.shopping:id/glow_sub_nav_bar_view"
                                            class="android.widget.LinearLayout"
                                            package="in.amazon.mShop.android.shopping"
                                            content-desc="" checkable="false" checked="false"
                                            clickable="false" enabled="true" focusable="false"
                                            focused="false" scrollable="false"
                                            long-clickable="false" password="false" selected="false"
                                            bounds="[0,239][1080,363]">
                                            <node index="0" text=""
                                                resource-id="in.amazon.mShop.android.shopping:id/container_glow_subnav"
                                                class="android.widget.LinearLayout"
                                                package="in.amazon.mShop.android.shopping"
                                                content-desc="" checkable="false" checked="false"
                                                clickable="false" enabled="true" focusable="false"
                                                focused="false" scrollable="false"
                                                long-clickable="false" password="false"
                                                selected="false" bounds="[0,239][1080,363]">
                                                <node index="0" text=""
                                                    resource-id="in.amazon.mShop.android.shopping:id/glow_subnav_ingress"
                                                    class="android.widget.Button"
                                                    package="in.amazon.mShop.android.shopping"
                                                    content-desc="" checkable="false"
                                                    checked="false" clickable="true" enabled="true"
                                                    focusable="true" focused="false"
                                                    scrollable="false" long-clickable="false"
                                                    password="false" selected="false"
                                                    bounds="[0,239][1080,363]">
                                                    <node index="0" text=""
                                                        resource-id="in.amazon.mShop.android.shopping:id/glow_subnav_icon"
                                                        class="android.widget.ImageView"
                                                        package="in.amazon.mShop.android.shopping"
                                                        content-desc="" checkable="false"
                                                        checked="false" clickable="false"
                                                        enabled="true" focusable="false"
                                                        focused="false" scrollable="false"
                                                        long-clickable="false" password="false"
                                                        selected="false" bounds="[28,273][84,329]" />
                                                    <node index="1"
                                                        text="Delivering to Bengaluru 562114 - Update location ⌵"
                                                        resource-id="in.amazon.mShop.android.shopping:id/glow_subnav_label"
                                                        class="android.widget.TextView"
                                                        package="in.amazon.mShop.android.shopping"
                                                        content-desc="" checkable="false"
                                                        checked="false" clickable="false"
                                                        enabled="true" focusable="false"
                                                        focused="false" scrollable="false"
                                                        long-clickable="false" password="false"
                                                        selected="false" bounds="[84,275][988,326]" />
                                                </node>
                                            </node>
                                        </node>
                                    </node>
                                </node>
                            </node>
                            <node index="5" text=""
                                resource-id="in.amazon.mShop.android.shopping:id/bottom_fixed_bar_container"
                                class="android.widget.LinearLayout"
                                package="in.amazon.mShop.android.shopping" content-desc=""
                                checkable="false" checked="false" clickable="false" enabled="true"
                                focusable="false" focused="false" scrollable="false"
                                long-clickable="false" password="false" selected="false"
                                bounds="[0,2115][1080,2273]">
                                <node index="0" text="" resource-id=""
                                    class="android.view.ViewGroup"
                                    package="in.amazon.mShop.android.shopping" content-desc=""
                                    checkable="false" checked="false" clickable="false"
                                    enabled="true" focusable="false" focused="false"
                                    scrollable="false" long-clickable="false" password="false"
                                    selected="false" bounds="[0,2115][1080,2273]">
                                    <node index="0" text=""
                                        resource-id="in.amazon.mShop.android.shopping:id/bottom_tab_nav_bar"
                                        class="android.widget.HorizontalScrollView"
                                        package="in.amazon.mShop.android.shopping" content-desc=""
                                        checkable="false" checked="false" clickable="false"
                                        enabled="true" focusable="true" focused="false"
                                        scrollable="false" long-clickable="false" password="false"
                                        selected="false" bounds="[0,2115][1080,2273]">
                                        <node index="0" text="" resource-id=""
                                            class="android.widget.LinearLayout"
                                            package="in.amazon.mShop.android.shopping"
                                            content-desc="" checkable="false" checked="false"
                                            clickable="false" enabled="true" focusable="false"
                                            focused="false" scrollable="false"
                                            long-clickable="false" password="false" selected="false"
                                            bounds="[0,2115][1080,2273]">
                                            <node index="0" text="" resource-id=""
                                                class="androidx.appcompat.app.ActionBar$Tab"
                                                package="in.amazon.mShop.android.shopping"
                                                content-desc="" checkable="false" checked="false"
                                                clickable="true" enabled="true" focusable="true"
                                                focused="false" scrollable="false"
                                                long-clickable="false" password="false"
                                                selected="true" bounds="[0,2115][216,2273]">
                                                <node index="0" text="" resource-id=""
                                                    class="android.widget.FrameLayout"
                                                    package="in.amazon.mShop.android.shopping"
                                                    content-desc="Home Tab 1 of 5" checkable="false"
                                                    checked="false" clickable="false" enabled="true"
                                                    focusable="false" focused="false"
                                                    scrollable="false" long-clickable="false"
                                                    password="false" selected="true"
                                                    bounds="[51,2115][164,2273]">
                                                    <node index="0" text=""
                                                        resource-id="in.amazon.mShop.android.shopping:id/bottom_tab_button_icon"
                                                        class="android.widget.ImageView"
                                                        package="in.amazon.mShop.android.shopping"
                                                        content-desc="" checkable="false"
                                                        checked="false" clickable="false"
                                                        enabled="true" focusable="false"
                                                        focused="false" scrollable="false"
                                                        long-clickable="false" password="false"
                                                        selected="true" bounds="[51,2115][164,2231]" />
                                                    <node index="1" text=" Home "
                                                        resource-id="in.amazon.mShop.android.shopping:id/bottom_tab_label"
                                                        class="android.widget.TextView"
                                                        package="in.amazon.mShop.android.shopping"
                                                        content-desc="" checkable="false"
                                                        checked="false" clickable="false"
                                                        enabled="true" focusable="false"
                                                        focused="false" scrollable="false"
                                                        long-clickable="false" password="false"
                                                        selected="true" bounds="[51,2208][163,2256]" />
                                                </node>
                                            </node>
                                            <node index="1" text="" resource-id=""
                                                class="androidx.appcompat.app.ActionBar$Tab"
                                                package="in.amazon.mShop.android.shopping"
                                                content-desc="" checkable="false" checked="false"
                                                clickable="true" enabled="true" focusable="true"
                                                focused="false" scrollable="false"
                                                long-clickable="false" password="false"
                                                selected="false" bounds="[216,2115][432,2273]">
                                                <node index="0" text="" resource-id=""
                                                    class="android.widget.FrameLayout"
                                                    package="in.amazon.mShop.android.shopping"
                                                    content-desc="Your Amazon.com Tab 2 of 5"
                                                    checkable="false" checked="false"
                                                    clickable="false" enabled="true"
                                                    focusable="false" focused="false"
                                                    scrollable="false" long-clickable="false"
                                                    password="false" selected="false"
                                                    bounds="[267,2115][380,2273]">
                                                    <node index="0" text=""
                                                        resource-id="in.amazon.mShop.android.shopping:id/bottom_tab_button_icon"
                                                        class="android.widget.ImageView"
                                                        package="in.amazon.mShop.android.shopping"
                                                        content-desc="" checkable="false"
                                                        checked="false" clickable="false"
                                                        enabled="true" focusable="false"
                                                        focused="false" scrollable="false"
                                                        long-clickable="false" password="false"
                                                        selected="false"
                                                        bounds="[267,2115][380,2231]" />
                                                    <node index="1" text=" You "
                                                        resource-id="in.amazon.mShop.android.shopping:id/bottom_tab_label"
                                                        class="android.widget.TextView"
                                                        package="in.amazon.mShop.android.shopping"
                                                        content-desc="" checkable="false"
                                                        checked="false" clickable="false"
                                                        enabled="true" focusable="false"
                                                        focused="false" scrollable="false"
                                                        long-clickable="false" password="false"
                                                        selected="false"
                                                        bounds="[285,2208][362,2256]" />
                                                </node>
                                            </node>
                                            <node index="2" text="" resource-id=""
                                                class="androidx.appcompat.app.ActionBar$Tab"
                                                package="in.amazon.mShop.android.shopping"
                                                content-desc="" checkable="false" checked="false"
                                                clickable="true" enabled="true" focusable="true"
                                                focused="false" scrollable="false"
                                                long-clickable="false" password="false"
                                                selected="false" bounds="[432,2115][648,2273]">
                                                <node index="0" text="" resource-id=""
                                                    class="android.widget.FrameLayout"
                                                    package="in.amazon.mShop.android.shopping"
                                                    content-desc="Context switcher. Switch between various contexts like Amazon Pay, miniTV, etc. Tab 3 of 5"
                                                    checkable="false" checked="false"
                                                    clickable="false" enabled="true"
                                                    focusable="false" focused="false"
                                                    scrollable="false" long-clickable="false"
                                                    password="false" selected="false"
                                                    bounds="[483,2115][596,2273]">
                                                    <node index="0" text=""
                                                        resource-id="in.amazon.mShop.android.shopping:id/bottom_tab_button_icon_cs"
                                                        class="android.widget.ImageView"
                                                        package="in.amazon.mShop.android.shopping"
                                                        content-desc="" checkable="false"
                                                        checked="false" clickable="false"
                                                        enabled="true" focusable="false"
                                                        focused="false" scrollable="false"
                                                        long-clickable="false" password="false"
                                                        selected="false"
                                                        bounds="[483,2115][596,2231]" />
                                                    <node index="1" text=" More "
                                                        resource-id="in.amazon.mShop.android.shopping:id/bottom_tab_label"
                                                        class="android.widget.TextView"
                                                        package="in.amazon.mShop.android.shopping"
                                                        content-desc="" checkable="false"
                                                        checked="false" clickable="false"
                                                        enabled="true" focusable="false"
                                                        focused="false" scrollable="false"
                                                        long-clickable="false" password="false"
                                                        selected="false"
                                                        bounds="[491,2208][588,2256]" />
                                                </node>
                                            </node>
                                            <node index="3" text="" resource-id=""
                                                class="androidx.appcompat.app.ActionBar$Tab"
                                                package="in.amazon.mShop.android.shopping"
                                                content-desc="" checkable="false" checked="false"
                                                clickable="true" enabled="true" focusable="true"
                                                focused="false" scrollable="false"
                                                long-clickable="false" password="false"
                                                selected="false" bounds="[648,2115][864,2273]">
                                                <node index="0" text="" resource-id=""
                                                    class="android.widget.FrameLayout"
                                                    package="in.amazon.mShop.android.shopping"
                                                    content-desc="Cart 0 item Tab 4 of 5"
                                                    checkable="false" checked="false"
                                                    clickable="false" enabled="true"
                                                    focusable="false" focused="false"
                                                    scrollable="false" long-clickable="false"
                                                    password="false" selected="false"
                                                    bounds="[699,2115][812,2273]">
                                                    <node index="0" text="" resource-id=""
                                                        class="android.widget.FrameLayout"
                                                        package="in.amazon.mShop.android.shopping"
                                                        content-desc="" checkable="false"
                                                        checked="false" clickable="false"
                                                        enabled="true" focusable="false"
                                                        focused="false" scrollable="false"
                                                        long-clickable="false" password="false"
                                                        selected="false"
                                                        bounds="[699,2115][812,2239]">
                                                        <node index="0" text=""
                                                            resource-id="in.amazon.mShop.android.shopping:id/bottom_tab_button_icon"
                                                            class="android.widget.ImageView"
                                                            package="in.amazon.mShop.android.shopping"
                                                            content-desc="" checkable="false"
                                                            checked="false" clickable="false"
                                                            enabled="true" focusable="false"
                                                            focused="false" scrollable="false"
                                                            long-clickable="false" password="false"
                                                            selected="false"
                                                            bounds="[699,2115][812,2231]" />
                                                        <node index="1" text="0"
                                                            resource-id="in.amazon.mShop.android.shopping:id/cart_count"
                                                            class="android.widget.TextView"
                                                            package="in.amazon.mShop.android.shopping"
                                                            content-desc="" checkable="false"
                                                            checked="false" clickable="false"
                                                            enabled="true" focusable="false"
                                                            focused="false" scrollable="false"
                                                            long-clickable="false" password="false"
                                                            selected="false"
                                                            bounds="[750,2130][772,2178]" />
                                                    </node>
                                                    <node index="1" text=" Cart "
                                                        resource-id="in.amazon.mShop.android.shopping:id/bottom_tab_label"
                                                        class="android.widget.TextView"
                                                        package="in.amazon.mShop.android.shopping"
                                                        content-desc="" checkable="false"
                                                        checked="false" clickable="false"
                                                        enabled="true" focusable="false"
                                                        focused="false" scrollable="false"
                                                        long-clickable="false" password="false"
                                                        selected="false"
                                                        bounds="[714,2208][796,2256]" />
                                                </node>
                                            </node>
                                            <node index="4" text="" resource-id=""
                                                class="androidx.appcompat.app.ActionBar$Tab"
                                                package="in.amazon.mShop.android.shopping"
                                                content-desc="" checkable="false" checked="false"
                                                clickable="true" enabled="true" focusable="true"
                                                focused="false" scrollable="false"
                                                long-clickable="false" password="false"
                                                selected="false" bounds="[864,2115][1080,2273]">
                                                <node index="0" text="" resource-id=""
                                                    class="android.widget.FrameLayout"
                                                    package="in.amazon.mShop.android.shopping"
                                                    content-desc="Browse menu Tab 5 of 5"
                                                    checkable="false" checked="false"
                                                    clickable="false" enabled="true"
                                                    focusable="false" focused="false"
                                                    scrollable="false" long-clickable="false"
                                                    password="false" selected="false"
                                                    bounds="[915,2115][1028,2273]">
                                                    <node index="0" text=""
                                                        resource-id="in.amazon.mShop.android.shopping:id/bottom_tab_button_icon"
                                                        class="android.widget.ImageView"
                                                        package="in.amazon.mShop.android.shopping"
                                                        content-desc="" checkable="false"
                                                        checked="false" clickable="false"
                                                        enabled="true" focusable="false"
                                                        focused="false" scrollable="false"
                                                        long-clickable="false" password="false"
                                                        selected="false"
                                                        bounds="[915,2115][1028,2231]" />
                                                    <node index="1" text=" Menu "
                                                        resource-id="in.amazon.mShop.android.shopping:id/bottom_tab_label"
                                                        class="android.widget.TextView"
                                                        package="in.amazon.mShop.android.shopping"
                                                        content-desc="" checkable="false"
                                                        checked="false" clickable="false"
                                                        enabled="true" focusable="false"
                                                        focused="false" scrollable="false"
                                                        long-clickable="false" password="false"
                                                        selected="false"
                                                        bounds="[919,2208][1023,2256]" />
                                                </node>
                                            </node>
                                        </node>
                                    </node>
                                </node>
                            </node>
                        </node>
                    </node>
                </node>
            </node>
        </node>
        <node index="1" text="" resource-id="android:id/navigationBarBackground"
            class="android.view.View" package="in.amazon.mShop.android.shopping" content-desc=""
            checkable="false" checked="false" clickable="false" enabled="true" focusable="false"
            focused="false" scrollable="false" long-clickable="false" password="false"
            selected="false" bounds="[0,2273][1080,2408]" />
    </node>
</hierarchy>
`;

runMobileAudit(sampleXml).then((issues) => {
  console.log("Accessibility Issues Found:");
  console.log(JSON.stringify(issues, null, 2));

  // Save result to JSON file
  fs.writeFileSync("./audit-result.json", JSON.stringify(issues, null, 2), "utf-8");
  console.log("✅ Results saved to audit-result.json");
});
