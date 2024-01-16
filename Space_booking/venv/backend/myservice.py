# my_service.py
import os
import sys
import win32serviceutil
import win32service
import win32event
import subprocess
import logging
from pathlib import Path
import time

class MyService(win32serviceutil.ServiceFramework):
    _svc_name_ = 'MyPythonService'
    _svc_display_name_ = 'My Python Service'

    def __init__(self, args):
        win32serviceutil.ServiceFramework.__init__(self, args)
        self.hWaitStop = win32event.CreateEvent(None, 0, 0, None)
        self.is_alive = True

    def SvcStop(self):
        self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
        win32event.SetEvent(self.hWaitStop)
        self.is_alive = False

    def SvcDoRun(self):
        self.timeout = 30000  # 30 seconds
        self.ReportServiceStatus(win32service.SERVICE_START_PENDING)
        servicename = 'MyPythonService'
        win32serviceutil.SetServiceCustomOption(servicename, win32service.SERVICE_ERROR_NORMAL)
        self.ReportServiceStatus(win32service.SERVICE_RUNNING)
        self.main()

    def main(self):
        # Set working directory
        os.chdir("C:/Users/cnixon/AppData/Roaming/Python/Python311/KENT/Space_booking/venv/backend")

        # Delay for service initialization
        time.sleep(10)

        # Activate the virtual environment
        activate_this = 'C:/Users/cnixon/AppData/Roaming/Python/Python311/KENT/Space_booking/venv/Scripts/activate'
        with open(activate_this) as f:
            exec(f.read(), dict(__file__=activate_this))

        # Add logging configuration
        logging.basicConfig(filename='service_log.txt', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

        # Run the script using subprocess for better control
        script_path = Path('C:/Users/cnixon/AppData/Roaming/Python/Python311/KENT/Space_booking/venv/backend/app.py')
        command = f'C:/Users/cnixon/AppData/Roaming/Python/Python311/KENT/Space_booking/venv/Scripts/python.exe {str(script_path)}'

        try:
            result = subprocess.run(command, shell=True, check=True)
            if result.returncode != 0:
                logging.error(f'Script execution failed with exit code {result.returncode}')
        except subprocess.CalledProcessError as e:
            logging.error(f'Script execution failed with exit code {e.returncode}')
        except Exception as e:
            logging.error(f'Script execution encountered an exception: {e}')

        # Log service stop
        logging.info('Service stopped')

if __name__ == '__main__':
    if len(sys.argv) == 1:
        servicename = 'MyPythonService'
        try:
            status = win32serviceutil.QueryServiceStatus(servicename)
        except Exception:
            win32serviceutil.InstallService(
                None,  # module
                servicename,
                'My Python Service',  # display name
                startType=win32service.SERVICE_AUTO_START
            )
        win32serviceutil.StartService(servicename)
    else:
        win32serviceutil.HandleCommandLine(MyService)

