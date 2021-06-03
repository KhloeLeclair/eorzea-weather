import { WEATHER_ICONS, XIVAPI_DOMAIN } from '../constants';

/**
 * Get the path for an icon as hosted by XIVAPI, based on the icon's ID.
 * This does not prefix the path or append the file extension. It merely
 * pads the ID and calculates the correct folder.
 *
 * @param id The numeric ID of the icon.
 * @returns The icon's path, including the subfolder it's in.
 */
export function getIconPath(id: number): string {
  const icon = `${id}`.padStart(6, '0'),
    folder = `${icon.slice(0, 3)}000`;

  return `${folder}/${icon}`;
}

export function getFullIcon(id: number, highQuality = false): string {
  return `${XIVAPI_DOMAIN}/i/${getIconPath(id)}${
    highQuality ? '_hr1' : ''
  }.png`;
}

export function getWeatherIcon(
  id: string,
  highQuality = false,
): string | undefined {
  const icon = WEATHER_ICONS[id];
  if (icon) return getFullIcon(icon, highQuality);
}
