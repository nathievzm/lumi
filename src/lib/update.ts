import { type Package } from 'update-notifier'

/**
 * Asynchronously checks for package updates and displays a notification if an update is available.
 *
 * @param pkg - The package information, typically imported from package.json, used to check for updates.
 *
 * @returns A boolean indicating whether the update check and notification process executed without throwing an error.
 */
export const notifyUpdate = async (pkg: Readonly<Package>) => {
    try {
        const { default: updateNotifier } = await import('update-notifier')

        const notifier = updateNotifier({ pkg })

        notifier.notify({
            boxenOptions: { borderColor: 'magenta', borderStyle: 'round', padding: 1 }
        })

        return true
    } catch {
        return false
    }
}
