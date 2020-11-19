
import backend.settings


def proxy():
    if backend.settings.USE_PROXY:
        # add your proxy here
        return {}
    else:
        return {}
