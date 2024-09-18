from src.config.config import Config
import logging

logger = logging.getLogger(__name__)

class kafka_connector:
    def __init__(self):
        self.config = Config()
        return

    def connect(self):
        self.config.KAFKA_CONNECT_URL
        
        logger.info("Kafka Connector Connected")
        return

    def disconnect(self):
        logger.info("Kafka Connector Disconnected")
        return

    def configure_sources(self):
        for source in self.config.SOURCES:
            # Configure the source
            logger.info(f"Data Source {source} Configured")        
            
        return

    def configure_syncs(self):
        for source in self.config.SYNCS:
            # Configure the Sync
            logger.info(f"Data Sync {source} Configured")        

        return

    def run_sync():
        return