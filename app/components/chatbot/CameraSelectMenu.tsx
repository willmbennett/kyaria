import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface CameraSelectMenuProps {
    videoDevices: MediaDeviceInfo[];
    selectedVideoDeviceId: string;
    selectVideoDevice: (deviceId: string) => void;
    type: string;
}

const cleanDeviceLabel = (label: string) => {
    const builtIn = label.match(/\(Built-in\)/);
    const cleanedLabel = label.replace(/\s*\(.*?\)\s*/g, '').trim();
    return builtIn ? `${cleanedLabel} (Built-in)` : cleanedLabel;
};



export const CameraSelectMenu = ({ videoDevices, selectedVideoDeviceId, selectVideoDevice, type }: CameraSelectMenuProps) => {
    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <Menu.Button
                        className={`group flex items-center bg-slate-100 text-slate-900 px-4  py-2  font-medium outline-none duration-150 ease-in-out focus:outline-none ${open
                            ? 'bg-slate-100 text-slate-900'
                            : 'text-slate-700 hover:bg-slate-100  hover:text-slate-900'
                            }`}
                    >
                        <span>{`Select ${type}`}</span>
                        <ChevronDownIcon
                            className={`ml-2 h-5 w-5 duration-300 ${open
                                ? 'rotate-180 text-slate-900'
                                : 'text-slate-600/90 group-hover:text-slate-900'
                                }`}
                            aria-hidden="true"
                        />
                    </Menu.Button>

                    <Menu.Items className="absolute right-0 z-50 bottom-full mb-2 w-52 space-y-1 bg-gray-secondary-50 p-2.5 outline-none drop-shadow filter focus:outline-none">
                        {videoDevices.map(device => (
                            <Menu.Item key={`${device.deviceId}-dropdown-camera`}>
                                <button
                                    key={device.deviceId}
                                    onClick={() => selectVideoDevice(device.deviceId)}
                                    className={`block px-5 py-3.5 font-medium w-full ${device.deviceId == selectedVideoDeviceId
                                        ? 'bg-gray-secondary-100/60 text-slate-900'
                                        : 'text-slate-700 transition duration-300 ease-in-out hover:bg-gray-secondary-100/60 hover:text-slate-900'
                                        }`}
                                >
                                    {cleanDeviceLabel(device.label) || `Camera ${device.deviceId}`}
                                </button>
                            </Menu.Item>
                        ))}
                    </Menu.Items>
                </>
            )
            }
        </Menu >
    );
};
