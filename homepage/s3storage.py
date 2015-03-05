# ##TODO## :: This is obviously VILE but it's a workaround for the fact
#      that boto's S3 is fundamentally broken with non-default S3 regions
#       in current versions. Fix for them or wait it out. =_=
import os
from storages.backends.s3boto import S3BotoStorage
os.environ['S3_USE_SIGV4'] = 'True'
class S3Storage(S3BotoStorage):
    @property
    def connection(self):
        if self._connection is None:
            self._connection = self.connection_class(
                self.access_key, self.secret_key,
                calling_format=self.calling_format, host='s3-ap-southeast-2.amazonaws.com')
        return self._connection
