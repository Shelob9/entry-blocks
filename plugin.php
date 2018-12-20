<?php
/**

 * @wordpress-plugin
 * Plugin Name: Caldera Entry Blocks
 * Description:
 * Version:     0.1.0
 * Author:
 * Author URI:
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Enqueue editor UI scripts & styles.
require_once( __DIR__ . '/inc/asset-loader.php' );
require_once( __DIR__ . '/inc/scripts.php' );
HMR_Demo\Scripts\setup();
