from datetime import datetime
from pathlib import Path
import os
import logging

logger = logging.getLogger(__name__)

class Config:
    _instance = None  # Singleton instance

    def __init__(self):
        if Config._instance is not None:
            raise Exception("This class is a singleton!")
        else:
            Config._instance = self
            self.config_items = []
            self.version = ""
            self.CONFIG_FOLDER = "."
            
            # Initialize configuration values
            self.initialize()

    def initialize(self):
        """Initialize configuration values."""
        self.config_items = []
        self.CONFIG_FOLDER = self._get_config_value("CONFIG_FOLDER", "/opt/mentorhub-elasticsearch", False)
        self.version = "1.0." + self._get_config_value("BUILT_AT", "LOCAL", False)

        # Set configuration values for Kafka, MongoDB, and Elasticsearch
        self.ELASTIC_CONNECTION_STRING = self._get_config_value("ELASTIC_CONNECTION_STRING", "http://localhost:9200", True)
        self.KAFKA_CONNECT_URL = self._get_config_value("KAFKA_CONNECT_URL", "http://localhost:8083", True)
        self.MONGODB_URI = self._get_config_value("MONGODB_URI", "mongodb://root:example@mentorhub-mongodb:27017", True)
        self.MONGO_DATABASE = self._get_config_value("MONGO_DATABASE", "mentorHub", False)
        self.MONGO_COLLECTIONS = self._get_config_value(
            "MONGO_COLLECTIONS", 
            "curriculum,encounters,partners,paths,people,plans,ratings,reviews,topics", 
            False
        ).split(",")  # Parse the collections as a list
        self.KAFKA_TOPIC_PREFIX = self._get_config_value("KAFKA_TOPIC_PREFIX", "mongo.", False)
        self.MONGODB_SOURCE_CONNECTOR = self._get_config_value("MONGODB_SOURCE_CONNECTOR", "mongodb-source-connector", False)
        self.ELASTICSEARCH_SINK_CONNECTOR = self._get_config_value("ELASTICSEARCH_SINK_CONNECTOR", "elasticsearch-sink-connector", False)
        self.ELASTICSEARCH_INDEX = self._get_config_value("ELASTICSEARCH_INDEX", "mentorhub-search", False)
        self.REQUEST_TIMEOUT = int(self._get_config_value("REQUEST_TIMEOUT", 30, False))
        self.MAX_RETRIES = int(self._get_config_value("MAX_RETRIES", 5, False))
        self.RETRY_DELAY = int(self._get_config_value("RETRY_DELAY", 3, False))

        # Log the initialized configuration
        logger.info(f"Configuration Initialized: {self.to_dict()}")
            
    def _get_config_value(self, name, default_value, is_secret):
        """Retrieve a configuration value, first from a file, then environment variable, then default."""
        value = default_value
        from_source = "default"

        # Check for config file first
        file_path = Path(self.CONFIG_FOLDER) / name
        if file_path.exists():
            value = file_path.read_text().strip()
            from_source = "file"
        # If no file, check for environment variable
        elif os.getenv(name):
            value = os.getenv(name)
            from_source = "environment"

        # Record the source of the config value
        self.config_items.append({
            "name": name,
            "value": "secret" if is_secret else value,
            "from": from_source
        })
        return value

    # Serializer
    def to_dict(self):
        """Convert the Config object to a dictionary with the required fields."""
        return {
            "version": self.version,
            "config_items": self.config_items
        }    

    # Singleton Getter
    @staticmethod
    def get_instance():
        """Get the singleton instance of the Config class."""
        if Config._instance is None:
            Config()
        return Config._instance
        
# Create a singleton instance of Config and export it
config = Config.get_instance()